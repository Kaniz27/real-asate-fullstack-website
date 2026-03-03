const db = require('../config/db');

exports.updateHeroText = async (req, res) => {
  const { headline, subheadline } = req.body;
  try {
    await db.query('UPDATE hero_settings SET headline = ?, subheadline = ? WHERE id = 1', [headline, subheadline]);
    res.status(200).json({ message: 'Hero text updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addHeroImage = async (req, res) => {
  const { url, alt } = req.body;
  try {
    const [result] = await db.query('INSERT INTO hero_backgrounds (url, alt) VALUES (?, ?)', [url, alt]);
    res.status(201).json({ id: result.insertId, message: 'Image added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteHeroImage = async (req, res) => {
  try {
    await db.query('DELETE FROM hero_backgrounds WHERE id = ?', [req.params.id]);
    res.status(200).json({ message: 'Image removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateButton = async (req, res) => {
  const { label, action, is_enabled } = req.body;
  try {
    let updateFields = [];
    let values = [];

    if (label !== undefined) { updateFields.push('label = ?'); values.push(label); }
    if (action !== undefined) { updateFields.push('action = ?'); values.push(action); }
    if (is_enabled !== undefined) { updateFields.push('is_enabled = ?'); values.push(is_enabled ? 1 : 0); }

    if (updateFields.length === 0) return res.status(400).json({ message: 'No fields to update' });

    values.push(req.params.id);
    await db.query(`UPDATE hero_cta_buttons SET ${updateFields.join(', ')} WHERE id = ?`, values);
    res.status(200).json({ message: 'Button updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addLocation = async (req, res) => {
    const { name } = req.body;
    try {
        const [result] = await db.query('INSERT INTO locations (name) VALUES (?)', [name]);
        res.status(201).json({ id: result.insertId, name });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteLocation = async (req, res) => {
    try {
        await db.query('DELETE FROM locations WHERE id = ?', [req.params.id]);
        res.status(200).json({ message: 'Location removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addPropertyType = async (req, res) => {
    const { name } = req.body;
    try {
        const [result] = await db.query('INSERT INTO property_types (name) VALUES (?)', [name]);
        res.status(201).json({ id: result.insertId, name });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePropertyType = async (req, res) => {
    try {
        await db.query('DELETE FROM property_types WHERE id = ?', [req.params.id]);
        res.status(200).json({ message: 'Property type removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addProperty = async (req, res) => {
    const { title, description, location_id, property_type_id, price, status, image_url, is_featured, featured_order } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO properties (title, description, location_id, property_type_id, price, status, image_url, is_featured, featured_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [title, description, location_id, property_type_id, price, status, image_url, is_featured, featured_order]
        );
        res.status(201).json({ id: result.insertId, message: 'Property added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProperty = async (req, res) => {
    const { title, description, location_id, property_type_id, price, status, image_url, is_featured, featured_order } = req.body;
    try {
        await db.query(
            'UPDATE properties SET title = ?, description = ?, location_id = ?, property_type_id = ?, price = ?, status = ?, image_url = ?, is_featured = ?, featured_order = ? WHERE id = ?',
            [title, description, location_id, property_type_id, price, status, image_url, is_featured, featured_order, req.params.id]
        );
        res.status(200).json({ message: 'Property updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProperty = async (req, res) => {
    try {
        await db.query('DELETE FROM properties WHERE id = ?', [req.params.id]);
        res.status(200).json({ message: 'Property removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateFeaturedProperty = async (req, res) => {
    const { is_featured, featured_order } = req.body;
    try {
        await db.query(
            'UPDATE properties SET is_featured = ?, featured_order = ? WHERE id = ?',
            [is_featured, featured_order, req.params.id]
        );
        res.status(200).json({ message: 'Featured property updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateFeaturedPropertiesVisibility = async (req, res) => {
    const { visible } = req.body;
    try {
        await db.query(
            "INSERT INTO settings (setting_key, setting_value) VALUES ('featured_properties_visible', ?) ON DUPLICATE KEY UPDATE setting_value = ?",
            [visible ? '1' : '0', visible ? '1' : '0']
        );
        res.status(200).json({ message: 'Featured properties visibility updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// "Why Choose Us" Management
exports.addWhyChooseUsItem = async (req, res) => {
    const { icon, title, description, display_order } = req.body;
    try {
        const [result] = await db.query('INSERT INTO why_choose_us_items (icon, title, description, display_order) VALUES (?, ?, ?, ?)', [icon, title, description, display_order || 0]);
        res.status(201).json({ id: result.insertId, message: 'Item added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateWhyChooseUsItem = async (req, res) => {
    const { icon, title, description, display_order } = req.body;
    try {
        await db.query('UPDATE why_choose_us_items SET icon = ?, title = ?, description = ?, display_order = ? WHERE id = ?', [icon, title, description, display_order, req.params.id]);
        res.status(200).json({ message: 'Item updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteWhyChooseUsItem = async (req, res) => {
    try {
        await db.query('DELETE FROM why_choose_us_items WHERE id = ?', [req.params.id]);
        res.status(200).json({ message: 'Item removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Testimonials Management
exports.addTestimonial = async (req, res) => {
    const { client_image_url, client_name, rating, comment, is_approved } = req.body;
    try {
        const [result] = await db.query('INSERT INTO testimonials (client_image_url, client_name, rating, comment, is_approved) VALUES (?, ?, ?, ?, ?)', [client_image_url, client_name, rating, comment, is_approved ? 1 : 0]);
        res.status(201).json({ id: result.insertId, message: 'Testimonial added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTestimonial = async (req, res) => {
    const { client_image_url, client_name, rating, comment, is_approved } = req.body;
    try {
        await db.query('UPDATE testimonials SET client_image_url = ?, client_name = ?, rating = ?, comment = ?, is_approved = ? WHERE id = ?', [client_image_url, client_name, rating, comment, is_approved ? 1 : 0, req.params.id]);
        res.status(200).json({ message: 'Testimonial updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.approveTestimonial = async (req, res) => {
    const { is_approved } = req.body;
    try {
        await db.query('UPDATE testimonials SET is_approved = ? WHERE id = ?', [is_approved ? 1 : 0, req.params.id]);
        res.status(200).json({ message: 'Testimonial status updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTestimonial = async (req, res) => {
    try {
        await db.query('DELETE FROM testimonials WHERE id = ?', [req.params.id]);
        res.status(200).json({ message: 'Testimonial removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Site Settings Management (Call Now Button, etc.)
exports.updateCallNowSettings = async (req, res) => {
    const { enabled, phoneNumber } = req.body;
    try {
        if (enabled !== undefined) {
            await db.query("UPDATE settings SET setting_value = ? WHERE setting_key = 'call_now_button_enabled'", [enabled ? '1' : '0']);
        }
        if (phoneNumber !== undefined) {
            await db.query("UPDATE settings SET setting_value = ? WHERE setting_key = 'call_now_button_phone_number'", [phoneNumber]);
        }
        res.status(200).json({ message: 'Call now settings updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

