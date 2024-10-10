/** @type {import('mock-config-server').MockServerConfig} */
const mockServerConfig = {
  rest: {
    baseUrl: '/api',
    configs: [
      {
        path: '/applications',
        method: 'get',
        routes: [{ data: [
            {
              "id": 1,
              "name": "WeatherApp",
              "description": "Provides real-time weather updates for any location.",
              "icon": "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/leaf.png",
              "screenshots": [
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg",
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg",
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg"
              ],
              "category": "Utilities",
              "orderNumber": 1,
              "createdAt": "2024-09-28T07:26:14.086Z",
              "updatedAt": "2024-09-28T07:26:14.086Z",
            },
            {
              "id": 2,
              "name": "CryptoTracker",
              "description": "Tracks cryptocurrency prices and market changes.",
              "icon": "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/leaf.png",
              "screenshots": [
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg",
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg",
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg"
              ],
              "category": "Finance",
              "orderNumber": 2,
              "createdAt": "2024-09-28T07:26:14.086Z",
              "updatedAt": "2024-09-28T07:26:14.086Z",
            },
            {
              "id": 3,
              "name": "NewsFeed",
              "description": "Aggregates the latest news from multiple sources.",
              "icon": "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/leaf.png",
              "screenshots": [
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg",
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg",
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg"
              ],
              "category": "News",
              "orderNumber": 3,
              "createdAt": "2024-09-28T07:26:14.086Z",
              "updatedAt": "2024-09-28T07:26:14.086Z",
            },
            {
              "id": 4,
              "name": "FitnessTracker",
              "description": "Monitors fitness activities and daily progress.",
              "icon": "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/leaf.png",
              "screenshots": [
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg",
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg",
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg"
              ],
              "category": "Health",
              "orderNumber": 4,
              "createdAt": "2024-09-28T07:26:14.086Z",
              "updatedAt": "2024-09-28T07:26:14.086Z",
            },
            {
              "id": 5,
              "name": "LanguageTutor",
              "description": "Helps users learn new languages interactively.",
              "icon": "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/leaf.png",
              "screenshots": [
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg",
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg",
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg"
              ],
              "category": "Education",
              "orderNumber": 5,
              "createdAt": "2024-09-28T07:26:14.086Z",
              "updatedAt": "2024-09-28T07:26:14.086Z",
            },
            {
              "id": 6,
              "name": "MovieGuide",
              "description": "Offers reviews and recommendations for movies.",
              "icon": "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/leaf.png",
              "screenshots": [
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg",
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg",
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg"
              ],
              "category": "Entertainment",
              "orderNumber": 6,
              "createdAt": "2024-09-28T07:26:14.086Z",
              "updatedAt": "2024-09-28T07:26:14.086Z",
            },
            {
              "id": 7,
              "name": "RecipeMaster",
              "description": "Provides step-by-step instructions for cooking recipes.",
              "icon": "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/leaf.png",
              "screenshots": [
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg",
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg",
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg"
              ],
              "category": "Food",
              "orderNumber": 7,
              "createdAt": "2024-09-28T07:26:14.086Z",
              "updatedAt": "2024-09-28T07:26:14.086Z",
            },
            {
              "id": 8,
              "name": "TaskManager",
              "description": "Organizes and tracks tasks for better productivity.",
              "icon": "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/leaf.png",
              "screenshots": [
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg",
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg",
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg"
              ],
              "category": "Productivity",
              "orderNumber": 8,
              "createdAt": "2024-09-28T07:26:14.086Z",
              "updatedAt": "2024-09-28T07:26:14.086Z",
            },
            {
              "id": 9,
              "name": "MusicStream",
              "description": "Streams music from various genres and artists.",
              "icon": "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/leaf.png",
              "screenshots": [
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg",
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg",
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg"
              ],
              "category": "Music",
              "orderNumber": 9,
              "createdAt": "2024-09-28T07:26:14.086Z",
              "updatedAt": "2024-09-28T07:26:14.086Z",
            },
            {
              "id": 9,
              "name": "TravelPlanner",
              "description": "Helps plan trips with itineraries and travel guides.",
              "icon": "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/leaf.png",
              "screenshots": [
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg",
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg",
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg"
              ],
              "category": "Travel",
              "orderNumber": 10,
              "createdAt": "2024-09-28T07:26:14.086Z",
              "updatedAt": "2024-09-28T07:26:14.086Z",
            }
          ] }]
      },
      {
        path: '/applications/1',
        method: 'get',
        routes: [
          {
            data: {
              "id": 1,
              "name": "WeatherApp",
              "description": "Provides real-time weather updates for any location.",
              "icon": "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/leaf.png",
              "screenshots": [
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg",
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg",
                "https://i.pinimg.com/originals/18/d0/b2/18d0b2f08e4a20ec0c6d67c57ff8e37c.jpg"
              ],
              "category": "Utilities",
              "orderNumber": 1,
              "createdAt": "2024-09-28T07:26:14.086Z",
              "updatedAt": "2024-09-28T07:26:14.086Z",
            }
          }
        ]
      }
    ]
  }
};

export default mockServerConfig;