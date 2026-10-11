import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const username = 'GimhanD7';
const number = new Intl.NumberFormat('en');

const GitHubSpotlight = () => {
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();
    const headers = { Accept: 'application/vnd.github+json' };

    const load = async () => {
      try {
        const profileResponse = await fetch(`https://api.github.com/users/${username}`, { headers, signal: controller.signal });
        if (profileResponse.status === 403 || profileResponse.status === 429) throw new Error('rate-limit');
        if (!profileResponse.ok) throw new Error('profile-unavailable');
        const profileData = await profileResponse.json();

        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers, signal: controller.signal });
        if (reposResponse.status === 403 || reposResponse.status === 429) throw new Error('rate-limit');
        if (!reposResponse.ok) throw new Error('repos-unavailable');
        const reposData = await reposResponse.json();

        const totals = {};
        reposData.forEach((repo) => {
          if (repo.language) totals[repo.language] = (totals[repo.language] || 0) + 1;
        });
        setProfile(profileData);
        setRepositories(reposData.filter((repo) => !repo.fork).slice(0, 4));
        setLanguages(Object.entries(totals).sort((a, b) => b[1] - a[1]).slice(0, 5));
        setStatus('ready');
      } catch (error) {
        if (error.name === 'AbortError') return;
        setStatus(error.message === 'rate-limit' ? 'limited' : 'error');
      }
    };

    load();
    return () => controller.abort();
  }, []);

  return (
    <section id="github" className="github-scene mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="section-kicker">Open source · GitHub</span>
          <h2 className="mt-4 text-4xl font-bold tracking-[-0.055em] text-white sm:text-5xl">A little more <span className="text-violet-300">in the open.</span></h2>
        </div>
        <a className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-violet-200 hover:text-white" href={`https://github.com/${username}`} target="_blank" rel="noreferrer">Visit GitHub <span aria-hidden="true">↗</span></a>
      </div>

      {status === 'loading' ? (
        <div className="modern-card rounded-3xl p-8 text-sm text-slate-400" role="status">Loading public GitHub profile…</div>
      ) : status === 'limited' || status === 'error' ? (
        <div className="modern-card rounded-3xl p-8" role="status">
          <p className="font-semibold text-white">{status === 'limited' ? 'GitHub is rate limiting profile requests right now.' : 'GitHub data is temporarily unavailable.'}</p>
          <p className="mt-2 text-sm text-slate-400">You can still view the profile and repositories directly on GitHub.</p>
          <a className="mt-5 inline-flex text-sm font-semibold text-violet-200 underline underline-offset-4" href={`https://github.com/${username}`} target="_blank" rel="noreferrer">Open github.com/{username}</a>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
          <motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="modern-card rounded-3xl p-7 sm:p-8">
            <div className="flex items-center gap-4">
              <img className="h-16 w-16 rounded-2xl border border-white/10" src={profile.avatar_url} alt={`${profile.login} GitHub avatar`} loading="lazy" />
              <div className="min-w-0"><h3 className="truncate text-lg font-bold text-white">{profile.name || profile.login}</h3><p className="text-sm text-slate-400">@{profile.login}</p></div>
            </div>
            {profile.bio && <p className="mt-6 max-w-md text-sm leading-6 text-slate-300">{profile.bio}</p>}
            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/[0.04] p-4"><strong className="block text-2xl text-white">{number.format(profile.public_repos)}</strong><span className="text-xs text-slate-400">Public repositories</span></div>
              <div className="rounded-2xl bg-white/[0.04] p-4"><strong className="block text-2xl text-white">{number.format(profile.followers)}</strong><span className="text-xs text-slate-400">Followers</span></div>
            </div>
            {languages.length > 0 && <div className="mt-7"><p className="mb-3 text-[10px] font-bold uppercase tracking-[.2em] text-slate-500">Languages by repository</p><div className="space-y-2">{languages.map(([language, count]) => <div key={language} className="flex items-center gap-3 text-xs"><span className="w-24 truncate text-slate-300">{language}</span><span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"><span className="block h-full rounded-full bg-violet-400" style={{ width: `${Math.max(8, (count / languages[0][1]) * 100)}%` }} /></span><span className="w-5 text-right text-slate-500">{count}</span></div>)}</div></div>}
          </motion.article>

          <div className="grid gap-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {repositories.map((repo, index) => <motion.a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .07 }} className="modern-card rounded-2xl p-5 transition-colors hover:border-violet-300/30">
                <div className="flex items-start justify-between gap-3"><h3 className="font-bold text-white">{repo.name}</h3><span aria-hidden="true" className="text-violet-300">↗</span></div>
                <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-slate-400">{repo.description || 'Public repository on GitHub.'}</p>
                <div className="mt-5 flex items-center gap-4 text-xs text-slate-500"><span>{repo.language || 'Code'}</span><span>★ {number.format(repo.stargazers_count)}</span></div>
              </motion.a>)}
            </div>
            <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="modern-card group block overflow-hidden rounded-2xl p-4" aria-label={`View ${username}'s GitHub contribution graph`}>
              <img src={`https://ghchart.rshah.org/8b5cf6/${username}`} alt={`GitHub contribution graph for ${username}`} loading="lazy" className="mx-auto h-auto w-full max-w-3xl opacity-80 transition-opacity group-hover:opacity-100" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default GitHubSpotlight;
