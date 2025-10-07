import { Router } from 'express';
import { Inquiry } from '../models/Inquiry.js';
import { getListingById } from '../services/listings.js';
import { sendInquiryEmail } from '../services/email.js';
import { createInquirySchema } from '../utils/validators.js';
import { inquiryRateLimiter } from '../middleware/rateLimit.js';
import { User } from '../models/User.js';

const router = Router();

// Create inquiry and send email
router.post('/', inquiryRateLimiter, async (req, res, next) => {
  try {
    const data = createInquirySchema.parse(req.body);

    // Get listing with agent info
    const listing = await getListingById(data.listingId);

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Ensure listing is active
    if (listing.status !== 'active') {
      return res.status(400).json({ error: 'This listing is no longer accepting inquiries' });
    }

    // Get agent info
    const agent = await User.findById(listing.agentId);

    if (!agent) {
      return res.status(500).json({ error: 'Agent not found' });
    }

    // Create inquiry
    const inquiry = new Inquiry({
      listingId: listing._id,
      agentId: agent._id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      emailStatus: 'queued',
    });

    await inquiry.save();

    // Send email
    try {
      await sendInquiryEmail(inquiry, listing, agent);
      inquiry.emailStatus = 'sent';
    } catch (emailError) {
      console.error('Failed to send inquiry email:', emailError);
      inquiry.emailStatus = 'failed';
    }

    await inquiry.save();

    res.json({ ok: true, inquiry: { id: inquiry._id } });
  } catch (error) {
    next(error);
  }
});

export default router;

