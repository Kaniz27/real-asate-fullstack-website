const db = require('../config/db');

exports.getHeroData = async (req, res) => {
  try {
    const [[settings]] = await db.query('SELECT headline, subheadline FROM hero_settings LIMIT 1');
    const [backgrounds] = await db.query('SELECT id, type, url, alt FROM hero_backgrounds');
    const [buttons] = await db.query('SELECT id, label, action, variant, is_enabled FROM hero_cta_buttons');

    const ctaButtons = buttons.map(btn => ({
      ...btn,
      is_enabled: btn.is_enabled === 1
    }));

    res.status(200).json({
      headline: settings ? settings.headline : "Welcome",
      subheadline: settings ? settings.subheadline : "Explore our properties.",
      backgrounds,
      ctaButtons
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
