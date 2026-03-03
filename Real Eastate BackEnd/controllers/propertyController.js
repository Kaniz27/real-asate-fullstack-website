const db = require('../config/db');

exports.searchProperties = async (req, res) => {
    try {
        const { location, property_type, min_price, max_price, status } = req.query;

        let query = `
            SELECT p.id, p.title, p.description, p.price, p.status, l.name as location, pt.name as property_type
            FROM properties p
            JOIN locations l ON p.location_id = l.id
            JOIN property_types pt ON p.property_type_id = pt.id
            WHERE 1=1
        `;
        const params = [];

        if (location) {
            query += ' AND l.id = ?';
            params.push(location);
        }
        if (property_type) {
            query += ' AND pt.id = ?';
            params.push(property_type);
        }
        if (min_price) {
            query += ' AND p.price >= ?';
            params.push(min_price);
        }
        if (max_price) {
            query += ' AND p.price <= ?';
            params.push(max_price);
        }
        if (status) {
            query += ' AND p.status = ?';
            params.push(status);
        }

        const [properties] = await db.query(query, params);
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getLocations = async (req, res) => {
    try {
        const [locations] = await db.query('SELECT * FROM locations');
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPropertyTypes = async (req, res) => {
    try {
        const [property_types] = await db.query('SELECT * FROM property_types');
        res.status(200).json(property_types);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFeaturedProperties = async (req, res) => {
    try {
        const [[featured_visible_setting]] = await db.query("SELECT setting_value FROM settings WHERE setting_key = 'featured_properties_visible'");
        
        if (!featured_visible_setting || featured_visible_setting.setting_value !== '1') {
            return res.status(200).json({
                visible: false,
                properties: []
            });
        }

        const [properties] = await db.query(`
            SELECT id, title, description, price, status, image_url 
            FROM properties 
            WHERE is_featured = 1 
            ORDER BY featured_order ASC
        `);

        res.status(200).json({
            visible: true,
            properties
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
