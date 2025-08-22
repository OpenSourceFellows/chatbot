'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert demo users
    const users = await queryInterface.bulkInsert('users', [
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        email: 'demo@example.com',
        phoneNumber: '+1234567890',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    // Insert demo courses
    await queryInterface.bulkInsert('courses', [
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        edxId: 'course-v1:DemoX+Demo101+2024',
        title: 'Introduction to Demo Course',
        description: 'A sample course for demonstration purposes',
        url: 'https://demo.example.com/courses/demo101',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    // Insert demo messages
    await queryInterface.bulkInsert('messages', [
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        userId: users[0].id,
        phoneNumber: '+1234567890',
        message: 'Hello, this is a demo message',
        response: 'Hi! Welcome to our demo chatbot. How can I help you today?',
        source: 'api',
        status: 'processed',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove demo data in reverse order
    await queryInterface.bulkDelete('messages', null, {});
    await queryInterface.bulkDelete('courses', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
