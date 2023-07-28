# VidVibes - A YouTube-like Web Application

## ![logo](https://github.com/bilashProshad/video-sharing/blob/main/client/src/assets/logo.png?raw=true)

VidVibes is a full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack, allowing users to experience a YouTube-like platform. With VidVibes, users can register, log in, browse, watch, like, dislike, subscribe, save videos, and even upload their own videos to share with the community. Uploaded videos are securely stored in the cloud using Cloudinary, and multer is utilized on the server for seamless video uploads.

### Features

- **User Authentication:**
  - Users can register an account with a unique email and password.
  - Registered users can log in to access their personalized accounts.
  - Logout functionality is available to securely end the user session.
- **Profile Management:**
  - Users can update their profile information, such as name, email and profile picture.
- **Video Watching and Interaction:**
  - Users can browse through a vast collection of videos on the platform.
  - While watching videos, users can like, dislike, and save videos to their playlists.
  - Video player with controls enables a smooth viewing experience.
- **Social Interaction:**
  - Users can subscribe to their favorite channels.
  - Comment section for users to share their thoughts and engage with other viewers.
- **Video Management (for Authorized Users):**
  - Authenticated users can upload their own videos to share with the community.
  - Uploaded videos are stored securely on Cloudinary for efficient video management.
  - Videos can be updated or deleted by their respective owners.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/bilashProshad/video-sharing.git
```

2. Navigate to the project directory:

```bash
cd video-sharing
```

3. Navigate to the server directory:

```bash
cd server
```

4. Install the server dependencies:

```bash
npm install
```

5. Navigate to the client directory:

```bash
cd ../client
```

6. Install the client dependencies:

```bash
npm install
```

### Configuration

1. Create a **`.env`** file in **server** directory and configure the following variables:

```js
PORT=4000
DB_URI=<MongoDB connection URI>
JWT_SECRET=<Secret key for JWT authentication>
JWT_EXPIRE=<Expiration time for JWT tokens>
COOKIE_EXPIRE=<Expiration time for Cookie>
CLOUDINARY_NAME=<Cloudinary name>
CLOUDINARY_API_KEY=<Cloudinary api key>
CLOUDINARY_SECRET=<Cloudinary secret>
FRONT_END_URL=http://localhost:3000
NODE_ENV="development"
```

2. Create a **`.env.local`** file in **client** directory and configure the following variables:

```js
VITE_APP_SERVER=http://localhost:4000
```

### Usage

1. Navigate to **`client`** directory and start the frontend server:

```bash
npm run dev
```

2. Navigate to **`server`** directory and start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to http://localhost:3000
