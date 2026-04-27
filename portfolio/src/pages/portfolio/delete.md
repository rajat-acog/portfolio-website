---
import { getCollection } from 'astro:content';

// Components
import Grid from '../components/Grid.astro';
import BaseLayout from '../layouts/BaseLayout.astro';
import ProfileCard from '../components/ProfileCard.astro';
import ContactCTA from '../components/ContactCTA.astro';
import CallToAction from '../components/CallToAction.astro';
import Icon from '../components/Icon.astro';

// ✅ GET ALL BLOGS
const entries = await getCollection('portfolios');

// 🧠 BUILD UNIQUE PROFILES FROM BLOGS
const profileMap = new Map();

entries.forEach((entry) => {
  const author = entry.data?.author;

  if (!author) return;

  const slug = author.toLowerCase();

  if (!profileMap.has(slug)) {
  profileMap.set(slug, {
    slug,
    name: author,
    position: entry.data.position ?? "Contributor",

    // 🔥 GitHub avatar (no API needed)
    avatar: entry.data.avatar || `https://github.com/${slug}.png`,

    description: entry.data.description ?? "Writes technical blogs",
  });
}
});

// ✅ FINAL PROFILES ARRAY
const profiles = Array.from(profileMap.values());

// 🔥 PROJECTS
const projects = (await getCollection('projects'))[0]?.data ?? [];
---

<BaseLayout>
	<main class="wrapper stack gap-20 lg:gap-32">

    	<!-- ✅ Top Heading -->
    	<section>
    		<h1 class="page-title">Welcome to Aganitha</h1>
    	</section>

    	<!-- ✅ Profiles Section -->
    	<section class="section">
    		<header class="margb section-header">
    			<h2>Profiles</h2>
    		</header>

    		<div class="gallery">
    			<Grid variant="small">

{
profiles.length > 0 ? (
profiles.map((person) => (
<li>
<a href={`/portfolio/${person.slug}`} style="text-decoration:none; color:inherit;" class="profile-link">
<ProfileCard
name={person.name}
position={person.position}
description={person.description}
avatar={person.avatar} <!-- ✅ FIXED -->
linkedin="#";
github="#";
/>
</a>
</li>
))
) : (
<div class="empty-state">

  <p>No contributors yet 🚀</p>
</div>
    )
  }
</Grid>
			</div>
		</section>

    	<!-- 🔥 PROJECTS SECTION -->
    	<section class="section with-cta">
    		<header class="margb section-header">
    			<h2>Ongoing Projects</h2>
    		</header>

    		<div class="gallery">
    			<ul class="projects-grid">
    				{
    					projects.length > 0 ? (
    						projects.slice(0, 6).map((project) => (
    							<li class="project-card">

<a href={`/projects/${project.slug}`} class="project-link">

    <div class="project-content">
      <h3 class="project-title">{project.name}</h3>

      <p class="project-desc">
        {project.description}
      </p>

      <p class="project-meta">
        👥 {project.people.length} members
      </p>
    </div>

    <div class="project-footer">
      <span>Explore →</span>
    </div>

  </a>
</li>
							))
						) : (
							<div class="empty-state">
  <p>No projects yet 🚀</p>
</div>
						)
					}
				</ul>
			</div>

    		<div class="cta">
    			<CallToAction href="/projects">
    				View All Projects
    				<Icon icon="arrow-right" size="1.2em" />
    			</CallToAction>
    		</div>
    	</section>

    	<ContactCTA />

    </main>

</BaseLayout>

<style>
.page-title {
	font-size: var(--text-4xl);
	font-weight: 600;
}

.section-header {
	text-align: left;
}

.margb {
	margin-bottom: 2rem;
}

/* PROJECTS GRID */
.projects-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: 1.5rem;
}

/* PROJECT CARD */
.project-card {
	list-style: none;
}

.card-link {
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 1.5rem;
	border-radius: 1rem;
	border: 1px solid var(--gray-800);
	background: var(--gradient-subtle);
	text-decoration: none;
	color: inherit;
	transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-link:hover {
	transform: translateY(-4px);
	box-shadow: var(--shadow-md);
}

.card-link h3 {
	font-size: var(--text-lg);
	font-weight: 600;
	margin-bottom: 0.5rem;
}

.card-link p {
	color: var(--gray-300);
	font-size: var(--text-sm);
}

.people-count {
	margin-top: auto;
	font-size: var(--text-xs);
	color: var(--gray-400);
}

.cta {
	margin-top: 2rem;
	display: flex;
	justify-content: center;
}

.profile-link {
  display: block;
  border-radius: 1.2rem;

  transition: all 0.18s ease;
}

.profile-link:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 12px 30px rgba(0,0,0,0.35);
}

.project-link {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 1.4rem;
  border-radius: 1.2rem;
  border: 1px solid var(--gray-800);
  background: var(--gradient-subtle);

  min-height: 180px;

  text-decoration: none;
  color: inherit;

  transition: all 0.18s ease;
}

.project-link:hover {
  transform: translateY(-5px) scale(1.01);
  box-shadow: 0 12px 30px rgba(0,0,0,0.35);
  border-color: var(--accent-regular);
}

.project-title {
  font-size: var(--text-md);
  font-weight: 700;
  color: var(--gray-0);
}

.project-desc {
  font-size: 0.8rem;
  color: var(--gray-400);
  margin-top: 0.6rem;
}

.project-meta {
  margin-top: 0.6rem;
  font-size: 0.75rem;
  color: var(--gray-500);
}

.project-footer {
  margin-top: 1rem;
  font-size: 0.8rem;
  color: var(--accent-regular);
  font-weight: 600;
}

.section {
  padding: 1.5rem;
  border-radius: 1.5rem;
  border: 1px solid var(--gray-800);
  background: var(--gradient-subtle);
}
.empty-state {
  text-align: center;
  padding: 2rem;
  color: var(--gray-400);
}

a {
  transition: all 0.2s ease;
}

</style>
