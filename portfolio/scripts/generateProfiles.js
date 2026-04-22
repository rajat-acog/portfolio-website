// import { faker } from '@faker-js/faker';
// import fs from 'fs-extra';
// import axios from 'axios';
// import path from 'path';
// import yaml from 'js-yaml';

// const COUNT = 8;

// const CONTENT_DIR = './src/content/portfolios';
// const PUBLIC_DIR = './public/portfolios';

// fs.emptyDirSync(CONTENT_DIR);
// fs.emptyDirSync(PUBLIC_DIR);

// // 🔥 download image
// async function downloadImage(url, filepath) {
//   const res = await axios({ url, method: 'GET', responseType: 'stream' });

//   return new Promise((resolve, reject) => {
//     const writer = fs.createWriteStream(filepath);
//     res.data.pipe(writer);
//     writer.on('finish', resolve);
//     writer.on('error', reject);
//   });
// }

// // 🔥 professional image
// function getImageUrl() {
//   const gender = Math.random() > 0.5 ? 'men' : 'women';
//   const id = Math.floor(Math.random() * 90);
//   return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
// }

// // 🔥 roles
// function roles() {
//   return faker.helpers.arrayElements(
//     [
//       { name: 'Developer', icon: 'code' },
//       { name: 'Backend Engineer', icon: 'server' },
//       { name: 'Frontend Engineer', icon: 'layout' },
//       { name: 'Problem Solver', icon: 'brain' },
//     ],
//     3
//   );
// }

// // 🔥 projects generator (FIXED)
// function generateProjects() {
//   return [
//     {
//       name: `${faker.company.name()} Platform`,
//       tech: [
//         faker.helpers.arrayElement(['React', 'Next.js', 'Vue']),
//         faker.helpers.arrayElement(['Node.js', 'Firebase', 'AWS']),
//       ],
//       frontend: `https://${faker.internet.domainName()}`,
//       backend: `https://api.${faker.internet.domainName()}`,
//     },
//     {
//       name: `${faker.company.name()} Dashboard`,
//       tech: [
//         faker.helpers.arrayElement(['Angular', 'React']),
//         faker.helpers.arrayElement(['MongoDB', 'Postgres']),
//       ],
//       frontend: `https://${faker.internet.domainName()}`,
//     },
//   ];
// }

// // 🔥 main
// async function main() {
//   for (let i = 0; i < COUNT; i++) {
//     const first = faker.person.firstName();
//     const last = faker.person.lastName();

//     const name = `${first} ${last}`;
//     const slug = `${first}-${last}`.toLowerCase();

//     const userDir = path.join(CONTENT_DIR, slug);
//     const publicDir = path.join(PUBLIC_DIR, slug);

//     fs.ensureDirSync(userDir);
//     fs.ensureDirSync(publicDir);

//     // ✅ image
//     const imagePath = path.join(publicDir, 'avatar.jpg');
//     await downloadImage(getImageUrl(), imagePath);

//     // ✅ blogs
//     const blogCount = faker.number.int({ min: 4, max: 6 });
//     const blogMeta = [];

//     for (let j = 0; j < blogCount; j++) {
//       const blogSlug = `blog-${j + 1}`;
//       const title = faker.lorem.sentence();

//       blogMeta.push({
//         title,
//         slug: blogSlug,
//       });

//       const md = `---
// title: "${title}"
// author: "${name}"
// ---

// ${faker.lorem.paragraphs(5)}
// `;

//       fs.writeFileSync(path.join(userDir, `${blogSlug}.md`), md);
//     }

//     // ✅ profile YAML (FIXED: includes projects)
//     const yamlData = {
//       name,
//       position: faker.person.jobTitle(),
//       description: faker.lorem.sentence(),
//       linkedin: `https://linkedin.com/in/${slug}`,
//       github: `https://github.com/${slug}`,

//       hero: {
//         title: `Hi, I'm ${name}`,
//         tagline: faker.person.jobTitle(),
//         image: `/portfolios/${slug}/avatar.jpg`,
//         image_alt: `${name} profile image`,
//         roles: roles(),
//       },

//       // ✅ FIXED
//       projects: generateProjects(),

//       // ✅ blogs meta
//       blogs: blogMeta,

//       summary: faker.lorem.paragraph(),
//     };

//     fs.writeFileSync(
//       path.join(userDir, 'index.yaml'),
//       yaml.dump(yamlData, { noRefs: true })
//     );
//   }

//   console.log('✅ FINAL: profiles + projects + blogs generated correctly');
// }

// main();





// import { faker } from '@faker-js/faker';
// import fs from 'fs-extra';
// import axios from 'axios';
// import path from 'path';
// import yaml from 'js-yaml';

// const COUNT = 8;

// const CONTENT_DIR = './src/content/portfolios';
// const PROJECT_FILE = './src/content/projects.yaml';
// const PUBLIC_DIR = './public/portfolios';

// fs.emptyDirSync(CONTENT_DIR);
// fs.emptyDirSync(PUBLIC_DIR);

// // =========================
// // 🔥 IMAGE DOWNLOAD
// // =========================
// async function downloadImage(url, filepath) {
//   const res = await axios({ url, method: 'GET', responseType: 'stream' });

//   return new Promise((resolve, reject) => {
//     const writer = fs.createWriteStream(filepath);
//     res.data.pipe(writer);
//     writer.on('finish', resolve);
//     writer.on('error', reject);
//   });
// }

// function getImageUrl() {
//   const gender = Math.random() > 0.5 ? 'men' : 'women';
//   const id = Math.floor(Math.random() * 90);
//   return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
// }

// // =========================
// // 🔥 HELPERS
// // =========================
// function slugify(text) {
//   return text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
// }

// function roles() {
//   return faker.helpers.arrayElements(
//     [
//       { name: 'Backend Engineer', icon: 'server' },
//       { name: 'Frontend Engineer', icon: 'layout' },
//       { name: 'Distributed Systems', icon: 'cpu' },
//       { name: 'DevOps Engineer', icon: 'cloud' },
//     ],
//     3
//   );
// }

// // =========================
// // 🔥 BLOG TOPICS
// // =========================
// const BLOG_TOPICS = [
//   "Scaling Node.js Applications in Production",
//   "Designing Microservices Architecture",
//   "Optimizing React Performance",
//   "Building Secure APIs with JWT",
//   "Dockerizing Modern Web Applications",
//   "Database Indexing Strategies Explained",
//   "CI/CD Pipelines Best Practices",
//   "System Design for High Traffic Systems",
// ];

// // =========================
// // 🔥 RESEARCH / PUBLICATION GENERATOR
// // =========================
// function generateResearchSection(author) {
//   return `
// ## Research & Publications

// ### 📄 Research Paper
// **Title:** ${faker.hacker.phrase()}  
// **Published In:** ${faker.company.name()} Engineering Journal  
// **Year:** ${faker.date.past().getFullYear()}  

// **Abstract:**  
// ${faker.lorem.paragraph()}

// ---

// ### 📘 Technical Whitepaper
// **Topic:** ${faker.hacker.noun()} optimization in distributed systems  

// ${faker.lorem.paragraph()}

// ---

// ### 🧠 Patent (Filed)
// **Title:** ${faker.hacker.verb()}-based system for ${faker.hacker.noun()}  

// **Description:**  
// ${faker.lorem.paragraph()}

// ---

// ### 🎤 Conference Talk
// **Event:** ${faker.company.name()} Tech Summit  
// **Topic:** ${faker.hacker.phrase()}  

// ${faker.lorem.paragraph()}
// `;
// }

// // =========================
// // 🔥 BLOG CONTENT GENERATOR
// // =========================
// function generateBlogContent(title, author) {
//   return `---
// title: "${title}"
// author: "${author}"
// date: "${faker.date.recent().toISOString()}"
// tags:
//   - ${faker.helpers.arrayElement(['backend', 'system-design', 'performance', 'devops'])}
//   - ${faker.helpers.arrayElement(['scaling', 'security', 'cloud', 'architecture'])}
// readingTime: "${faker.number.int({ min: 5, max: 12 })} min"
// difficulty: "${faker.helpers.arrayElement(['Beginner', 'Intermediate', 'Advanced'])}"
// ---

// ## 🚀 Introduction

// ${faker.lorem.paragraph()}

// ${faker.lorem.paragraph()}

// ---

// ## 🧩 Problem Statement

// ${faker.lorem.paragraph()}

// ${faker.lorem.paragraph()}

// ---

// ## ⚙️ System Design Approach

// ${faker.lorem.paragraph()}

// ${faker.lorem.paragraph()}

// ${faker.lorem.paragraph()}

// ---

// ## 📊 Architecture Decisions

// - ${faker.lorem.sentence()}

// - ${faker.lorem.sentence()}

// - ${faker.lorem.sentence()}

// ---

// ## ⚡ Performance Optimizations

// ${faker.lorem.paragraph()}

// ${faker.lorem.paragraph()}

// ---

// ## 🔐 Security Considerations

// ${faker.lorem.paragraph()}

// ${faker.lorem.paragraph()}

// ---

// ## 📈 Results & Impact

// ${faker.lorem.paragraph()}

// ${faker.lorem.paragraph()}

// ---

// ## 🔬 Research & Publications

// ### 📄 Research Paper

// **Title:** ${faker.hacker.phrase()}

// **Published In:** ${faker.company.name()} Engineering Journal  

// **Year:** ${faker.date.past().getFullYear()}

// **Abstract:**

// ${faker.lorem.paragraph()}

// ---

// ### 📘 Technical Whitepaper

// **Topic:** ${faker.hacker.noun()} optimization in distributed systems  

// ${faker.lorem.paragraph()}

// ---

// ### 🧠 Patent (Filed)

// **Title:** ${faker.hacker.phrase()}

// **Description:**

// ${faker.lorem.paragraph()}

// ---

// ### 🎤 Conference Talk

// **Event:** ${faker.company.name()} Tech Summit  

// **Topic:** ${faker.hacker.phrase()}

// ${faker.lorem.paragraph()}

// ---

// ## ✅ Conclusion

// ${faker.lorem.paragraph()}

// ${faker.lorem.paragraph()}
// `;
// }

// // =========================
// // 🔥 PROJECT DESCRIPTION
// // =========================
// function generateProjectDescription(name) {
//   return `
// ${name} is a large-scale system designed for ${faker.hacker.noun()} optimization and high-performance workloads.

// It uses a distributed architecture powered by microservices, event-driven pipelines, and cloud-native infrastructure.

// The platform handles:
// - High concurrency traffic
// - Real-time data processing
// - Fault-tolerant service orchestration

// This system significantly improves scalability, resilience, and developer productivity in enterprise environments.
// `.trim();
// }

// // =========================
// // 🔥 MAIN
// // =========================
// async function main() {
//   const allUsers = [];

//   // =========================
//   // 👤 USERS
//   // =========================
//   for (let i = 0; i < COUNT; i++) {
//     const name = faker.person.fullName();
//     const slug = slugify(name);

//     allUsers.push(slug);

//     const userDir = path.join(CONTENT_DIR, slug);
//     const publicDir = path.join(PUBLIC_DIR, slug);

//     fs.ensureDirSync(userDir);
//     fs.ensureDirSync(publicDir);

//     await downloadImage(getImageUrl(), path.join(publicDir, 'avatar.jpg'));

//     // =========================
//     // 📝 BLOGS
//     // =========================
//     const blogCount = faker.number.int({ min: 4, max: 6 });
//     const blogMeta = [];

//     for (let j = 0; j < blogCount; j++) {
//       const title = faker.helpers.arrayElement(BLOG_TOPICS);
//       const blogSlug = slugify(title);

//       blogMeta.push({ title, slug: blogSlug });

//       const content = generateBlogContent(title, slug);

//       fs.writeFileSync(path.join(userDir, `${blogSlug}.md`), content);
//     }

//     // =========================
//     // 📄 USER YAML
//     // =========================
//     const yamlData = {
//       name,
//       slug,
//       position: faker.person.jobTitle(),
//       description: faker.lorem.sentence(),
//       linkedin: `https://linkedin.com/in/${slug}`,
//       github: `https://github.com/${slug}`,

//       hero: {
//         title: `Hi, I'm ${name}`,
//         tagline: faker.person.jobTitle(),
//         image: `/portfolios/${slug}/avatar.jpg`,
//         image_alt: `${name} profile image`,
//         roles: roles(),
//       },

//       blogs: blogMeta,
//       summary: faker.lorem.paragraph(),
//     };

//     fs.writeFileSync(
//       path.join(userDir, 'index.yaml'),
//       yaml.dump(yamlData, { noRefs: true })
//     );
//   }

//   // =========================
//   // 🏗️ PROJECTS (DB SIMULATION)
//   // =========================
//   const PROJECT_COUNT = 6;
//   const projects = [];

//   for (let i = 0; i < PROJECT_COUNT; i++) {
//     const title = `${faker.company.name()} ${faker.helpers.arrayElement(['Platform', 'System', 'Engine'])}`;
//     const slug = slugify(title);

//     const assignedUsers = faker.helpers.arrayElements(
//       allUsers,
//       faker.number.int({ min: 2, max: 4 })
//     );

//     projects.push({
//       name: title,
//       slug,
//       description: generateProjectDescription(title),

//       tech: faker.helpers.arrayElements(
//         ['Node.js', 'Kafka', 'Redis', 'AWS', 'Docker', 'Postgres', 'GraphQL'],
//         4
//       ),

//       status: faker.helpers.arrayElement([
//         'In Production',
//         'Scaling Phase',
//         'In Development',
//       ]),

//       teamSize: assignedUsers.length,

//       people: assignedUsers,
//     });
//   }

//   fs.writeFileSync(PROJECT_FILE, yaml.dump(projects));

//   console.log('✅ PRODUCTION-LEVEL DATA GENERATED (Blogs + Research + Projects)');
// }

// main();




import Database from 'better-sqlite3';
import { faker } from '@faker-js/faker';
import fs from 'fs-extra';
import axios from 'axios';
import path from 'path';
import yaml from 'js-yaml';

const COUNT = 8;
const PROJECT_COUNT = 6;

const CONTENT_DIR = './src/content/portfolios';
const PUBLIC_DIR = './public/portfolios';
const PROJECT_FILE = './src/content/projects.yaml';

// reset folders
fs.emptyDirSync(CONTENT_DIR);
fs.emptyDirSync(PUBLIC_DIR);

// =========================
// 🔥 DB SETUP
// =========================
const db = new Database('./data.db');

db.exec(`
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS project_members;
DROP TABLE IF EXISTS blogs;

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT,
  position TEXT
);

CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  name TEXT,
  description TEXT,
  tech TEXT,
  status TEXT,
  teamSize INTEGER
);

CREATE TABLE project_members (
  user_id TEXT,
  project_id TEXT
);

CREATE TABLE blogs (
  id TEXT PRIMARY KEY,
  title TEXT,
  author TEXT,
  content TEXT
);
`);

// =========================
// 🔧 HELPERS
// =========================
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function getImageUrl() {
  const gender = Math.random() > 0.5 ? 'men' : 'women';
  const id = Math.floor(Math.random() * 90);
  return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
}

async function downloadImage(url, filepath) {
  try {
    const res = await axios({ url, method: 'GET', responseType: 'stream' });

    await new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(filepath);
      res.data.pipe(writer);
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

  } catch {
    fs.copyFileSync('./public/placeholder.jpg', filepath);
  }
}

// =========================
// 🔥 BLOG GENERATOR (UNCHANGED)
// =========================
function generateBlogContent(title, author) {
  return `---
title: "${title}"
author: "${author}"
date: "${faker.date.recent().toISOString()}"
---

## 🚀 Introduction
<br />
${faker.lorem.paragraph()}

<br />
---

## 🧩 Problem Statement
<br />
${faker.lorem.paragraph()}

<br />
---

## ⚙️ System Design Approach
<br />
${faker.lorem.paragraphs(2)}

<br />
---

## 📊 Architecture Decisions
<br />
- ${faker.lorem.sentence()}
- ${faker.lorem.sentence()}
- ${faker.lorem.sentence()}

<br />
---

## ⚡ Performance Optimizations
<br />
${faker.lorem.paragraph()}

<br />
---

## 🔐 Security Considerations
<br />
${faker.lorem.paragraph()}

<br />
---

## 📈 Results & Impact
<br />
${faker.lorem.paragraph()}

<br />
---

## ✅ Conclusion
<br />
${faker.lorem.paragraph()}
<br />
`;
}

// =========================
// 👥 USERS
// =========================
const users = [];

for (let i = 0; i < COUNT; i++) {
  const name = faker.person.fullName();
  const slug = slugify(name);

  users.push({ name, slug });

  db.prepare(`INSERT INTO users VALUES (?, ?, ?)`)
    .run(slug, name, faker.person.jobTitle());
}

// =========================
// 🚀 PROJECTS
// =========================
for (let i = 0; i < PROJECT_COUNT; i++) {
  const title = `${faker.company.name()} Platform`;
  const slug = slugify(title);

  const tech = faker.helpers.arrayElements(
    ['Node.js','Kafka','Redis','AWS','Docker','Postgres'],
    4
  );

  db.prepare(`INSERT INTO projects VALUES (?, ?, ?, ?, ?, ?)`)
    .run(
      slug,
      title,
      faker.lorem.paragraph(),
      JSON.stringify(tech),
      faker.helpers.arrayElement(['In Production','Scaling','Development']),
      faker.number.int({ min: 3, max: 8 })
    );

  const members = faker.helpers.arrayElements(users, 3);

  members.forEach((m) => {
    db.prepare(`INSERT INTO project_members VALUES (?, ?)`)
      .run(m.slug, slug);
  });
}

// =========================
// 📝 BLOGS (STORE IN DB FIRST)
// =========================
const allUsers = db.prepare(`SELECT * FROM users`).all();

for (const user of allUsers) {
  for (let i = 0; i < 4; i++) {
    const title = faker.helpers.arrayElement([
      'Scaling Node.js Systems',
      'Microservices Design Patterns',
      'Secure API Design',
      'Cloud Infrastructure Best Practices'
    ]);

    const blogSlug = slugify(
  `${title}-${user.id}-${faker.string.alphanumeric(6)}`
);

    const content = generateBlogContent(title, user.id);

    db.prepare(`
      INSERT INTO blogs VALUES (?, ?, ?, ?)
    `).run(blogSlug, title, user.id, content);
  }
}

// =========================
// 🔄 GENERATE FILES FROM DB
// =========================
for (const user of allUsers) {
  const userDir = path.join(CONTENT_DIR, user.id);
  const publicDir = path.join(PUBLIC_DIR, user.id);

  fs.ensureDirSync(userDir);
  fs.ensureDirSync(publicDir);

  // image
  await downloadImage(
    getImageUrl(),
    path.join(publicDir, 'avatar.jpg')
  );

  const imagePublicPath = `/portfolios/${user.id}/avatar.jpg`;

  // 🔥 GET BLOGS FROM DB
  const userBlogs = db.prepare(`
    SELECT * FROM blogs WHERE author = ?
  `).all(user.id);

  const blogMeta = [];

  userBlogs.forEach((blog) => {
    blogMeta.push({
      title: blog.title,
      slug: blog.id,
    });

    fs.writeFileSync(
      path.join(userDir, `${blog.id}.md`),
      blog.content
    );
  });

  // 🔥 PROFILE YAML
  const yamlData = {
    name: user.name,
    slug: user.id,
    position: user.position,
    description: faker.lorem.sentence(),

    linkedin: `https://linkedin.com/in/${user.id}`,
    github: `https://github.com/${user.id}`,

    hero: {
      title: `Hi, I'm ${user.name}`,
      tagline: user.position,
      image: imagePublicPath,
      image_alt: `${user.name} profile`,
      roles: [
        { name: 'Developer', icon: 'code' },
        { name: 'Engineer', icon: 'server' },
      ],
    },

    blogs: blogMeta,
  };

  fs.writeFileSync(
    path.join(userDir, 'index.yaml'),
    yaml.dump(yamlData)
  );
}

// =========================
// 📦 PROJECTS YAML
// =========================
const projects = db.prepare(`SELECT * FROM projects`).all();

const finalProjects = projects.map((p) => {
  const people = db.prepare(`
    SELECT user_id FROM project_members WHERE project_id = ?
  `).all(p.id).map((x) => x.user_id);

  return {
    name: p.name,
    slug: p.id,
    description: p.description,
    tech: JSON.parse(p.tech),
    status: p.status,
    teamSize: p.teamSize,
    people,
  };
});

fs.writeFileSync(PROJECT_FILE, yaml.dump(finalProjects));

console.log('✅ DONE: DB is source of truth → YAML + MD generated');