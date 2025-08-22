const OpenAI = require('openai');
const logger = require('../../config/logger');
const { Message } = require('../../models');
const config = require('../../config/config');

class ChatbotService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: config.aiApiKey,
    });
  }

  /**
   * Process incoming message and generate AI response
   * @param {string} message - The incoming message
   * @param {string} phoneNumber - Phone number of the sender
   * @param {string} userId - Optional user ID
   * @returns {Promise<Object>} - Response object
   */
  async processMessage(message, phoneNumber, userId = null) {
    try {
      // Store incoming message
      const storedMessage = await Message.create({
        userId,
        phoneNumber,
        message,
        source: 'api',
        status: 'pending'
      });

      // Generate AI response
      const aiResponse = await this.generateAIResponse(message);
      
      // Update message with response
      await storedMessage.update({
        response: aiResponse,
        status: 'processed'
      });

      return {
        messageId: storedMessage.id,
        response: aiResponse,
        timestamp: storedMessage.updatedAt
      };
    } catch (error) {
      logger.error('Error processing message:', error);
      
      // Update message status to failed if it exists
      if (storedMessage) {
        await storedMessage.update({ status: 'failed' });
      }
      
      throw error;
    }
  }

  /**
   * Generate AI response using OpenAI
   * @param {string} message - The user message
   * @returns {Promise<string>} - AI generated response
   */
  async generateAIResponse(message) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: config.aiModel || 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful educational chatbot assistant. Provide clear, concise, and helpful responses.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      });

      return completion.choices[0]?.message?.content || 'I apologize, but I am unable to generate a response at the moment.';
    } catch (error) {
      logger.error('Error generating AI response:', error);
      return 'I apologize, but I am experiencing technical difficulties. Please try again later.';
    }
  }

  /**
   * Get chat history for a user or phone number
   * @param {string} userId - Optional user ID
   * @param {string} phoneNumber - Optional phone number
   * @param {number} limit - Number of messages to return
   * @param {number} offset - Number of messages to skip
   * @returns {Promise<Array>} - Array of messages
   */
  async getChatHistory(userId = null, phoneNumber = null, limit = 50, offset = 0) {
    try {
      const whereClause = {};
      
      if (userId) {
        whereClause.userId = userId;
      }
      
      if (phoneNumber) {
        whereClause.phoneNumber = phoneNumber;
      }

      const messages = await Message.findAll({
        where: whereClause,
        order: [['createdAt', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      return messages;
    } catch (error) {
      logger.error('Error getting chat history:', error);
      throw error;
    }
  }
}

module.exports = new ChatbotService();
