const db = require('../config/db');

// ─── Why Choose Us ─────────────────────────────────────────────────────────────

exports.getWhyChooseUsItems = async (req, res) => {
    try {
        const [items] = await db.query('SELECT id, icon, title, description, display_order FROM why_choose_us_items ORDER BY display_order ASC');
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addWhyChooseUsItem = async (req, res) => {
    const { icon, title, description, display_order } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO why_choose_us_items (icon, title, description, display_order) VALUES (?, ?, ?, ?)',
            [icon, title, description, display_order || 0]
        );
        res.status(201).json({ id: result.insertId, message: 'Item added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateWhyChooseUsItem = async (req, res) => {
    const { icon, title, description, display_order } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE why_choose_us_items SET icon = ?, title = ?, description = ?, display_order = ? WHERE id = ?',
            [icon, title, description, display_order, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json({ message: 'Item updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteWhyChooseUsItem = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM why_choose_us_items WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json({ message: 'Item removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ─── Testimonials ───────────────────────────────────────────────────────────────

exports.getTestimonials = async (req, res) => {
    try {
        const [testimonials] = await db.query(
            'SELECT id, client_image_url, client_name, rating, comment, is_approved FROM testimonials WHERE is_approved = 1'
        );
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllTestimonials = async (req, res) => {
    try {
        const [testimonials] = await db.query(
            'SELECT id, client_image_url, client_name, rating, comment, is_approved FROM testimonials ORDER BY id DESC'
        );
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addTestimonial = async (req, res) => {
    const { client_image_url, client_name, rating, comment, is_approved } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO testimonials (client_image_url, client_name, rating, comment, is_approved) VALUES (?, ?, ?, ?, ?)',
            [client_image_url, client_name, rating, comment, is_approved ? 1 : 0]
        );
        res.status(201).json({ id: result.insertId, message: 'Testimonial added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTestimonial = async (req, res) => {
    const { client_image_url, client_name, rating, comment, is_approved } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE testimonials SET client_image_url = ?, client_name = ?, rating = ?, comment = ?, is_approved = ? WHERE id = ?',
            [client_image_url, client_name, rating, comment, is_approved ? 1 : 0, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Testimonial not found' });
        res.status(200).json({ message: 'Testimonial updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.approveTestimonial = async (req, res) => {
    const { is_approved } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE testimonials SET is_approved = ? WHERE id = ?',
            [is_approved ? 1 : 0, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Testimonial not found' });
        res.status(200).json({ message: 'Testimonial status updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTestimonial = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM testimonials WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Testimonial not found' });
        res.status(200).json({ message: 'Testimonial removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ─── Call Now Settings ──────────────────────────────────────────────────────────

exports.getCallNowSetting = async (req, res) => {
    try {
        const [settings] = await db.query("SELECT setting_key, setting_value FROM settings WHERE setting_key IN ('call_now_button_enabled', 'call_now_button_phone_number')");
        
        const callNowSettings = settings.reduce((acc, setting) => {
            acc[setting.setting_key] = setting.setting_value;
            return acc;
        }, {});

        res.status(200).json({
            enabled: callNowSettings.call_now_button_enabled === '1',
            phoneNumber: callNowSettings.call_now_button_phone_number
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCallNowSetting = async (req, res) => {
    const { enabled, phoneNumber } = req.body;
    try {
        if (enabled !== undefined) {
            await db.query(
                "UPDATE settings SET setting_value = ? WHERE setting_key = 'call_now_button_enabled'",
                [enabled ? '1' : '0']
            );
        }
        if (phoneNumber !== undefined) {
            await db.query(
                "UPDATE settings SET setting_value = ? WHERE setting_key = 'call_now_button_phone_number'",
                [phoneNumber]
            );
        }
        res.status(200).json({ message: 'Call now settings updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
