import { siteConfig } from '@/lib/config'

/**
 * GitHub 프로젝트 링크 카드
 * @param {*} props
 * @returns
 */
export function GitHubProjectsCard() {
    const projects = siteConfig('GITHUB_PROJECTS', [])

    return (
        <div className='text-md flex flex-col space-y-2 justify-center px-3'>
            <div className='flex items-center mb-2'>
                <i className='fab fa-github mr-2 text-lg'></i>
                <span className='font-semibold'>Projects</span>
            </div>
            {projects.map((project, index) => (
                <a
                    key={index}
                    href={project.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center space-x-2 py-1.5 px-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 group'>
                    <i className='fab fa-github text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100'></i>
                    <span className='text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 font-mono text-sm'>
                        {project.name}
                    </span>
                </a>
            ))}
        </div>
    )
}
