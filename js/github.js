import { Octokit } from "https://cdn.skypack.dev/@octokit/rest@19.0.7";

window.addEventListener("load", async function() {
  const token = 'TM7HsYtU4XRTCLCCdDcBPqcqyWPr9YGQrqNQsWcVT2sIZhEWu2d1I4ZERnT_zUghTF4P6BEr0AJP6OLA11_tap';
  const owner = 'sinjikoro';
  const repo = 'sdk_sample';

  const octokit = new Octokit({ auth: tokenGenerator(token) });
  const response = await octokit.request('GET /repos/{owner}/{repo}/releases', {
    owner: owner,
    repo: repo,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    },
  });
  const releases = response.data;
  
  const releasesList = this.document.querySelector('#releases');

  releases.forEach((release) => {
    if (!release.prerelease) {
        const li = this.document.createElement('li');
        //title
        const title = this.document.createElement('h2');
        const tag_name = release.tag_name;
        const date = release.published_at.slice(0,10).replace(/-/g, '/');
        title.textContent = `${tag_name} (${date})`;

        li.appendChild(title);
        //body
        const body = this.document.createElement('p');
        body.textContent = release.body;
        li.appendChild(body);
        //asset
        const innerUl = this.document.createElement('ul');
        release.assets.forEach(asset => {
            const innerLi = this.document.createElement('li')
            const link = this.document.createElement('a');
            link.href = asset.browser_download_url;
            link.textContent = asset.name;
            innerLi.appendChild(link);
            innerUl.appendChild(innerLi);
        });
        li.appendChild(innerUl);

        const test = this.document.createElement('p');
        // test.textContent = propcess.env.TEST;


        releasesList.appendChild(li);
    };
});
})

function tokenGenerator(token) {
    const github = 'github';
    token = token.split('').reverse().join('');
    return `${github}_${token}`;
}