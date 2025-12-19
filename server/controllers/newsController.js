import News from '../models/News.js';

// Get all news (public)
export const getAllNews = async (req, res) => {
  try {
    const { category, featured, page = 1, limit = 10 } = req.query;

    let filter = { published: true };

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (featured === 'true') {
      filter.featured = true;
    }

    const skip = (page - 1) * limit;

    const news = await News.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await News.countDocuments(filter);

    res.json({
      success: true,
      count: news.length,
      total,
      pages: Math.ceil(total / limit),
      news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching news',
      error: error.message
    });
  }
};

// Get single news
export const getSingleNews = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    res.json({
      success: true,
      news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching news',
      error: error.message
    });
  }
};

// Create news (admin only)
export const createNews = async (req, res) => {
  try {
    const { title, description, content, category, readTime } = req.body;

    if (!title || !description || !content || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const news = await News.create({
      title,
      description,
      content,
      category,
      readTime: readTime || '3 min read',
      author: req.user.name,
      authorId: req.userId
    });

    res.status(201).json({
      success: true,
      message: 'News created successfully',
      news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating news',
      error: error.message
    });
  }
};

// Update news (admin only)
export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content, category, featured, published } = req.body;

    const news = await News.findByIdAndUpdate(
      id,
      { title, description, content, category, featured, published },
      { new: true, runValidators: true }
    );

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    res.json({
      success: true,
      message: 'News updated successfully',
      news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating news',
      error: error.message
    });
  }
};

// Delete news (admin only)
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findByIdAndDelete(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    res.json({
      success: true,
      message: 'News deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting news',
      error: error.message
    });
  }
};

// Like news
export const likeNews = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    res.json({
      success: true,
      message: 'News liked',
      news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error liking news',
      error: error.message
    });
  }
};
