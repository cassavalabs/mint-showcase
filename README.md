<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url] -->

<div align="center">
  <a href="https://cassavaland.io">
    <img src="apps/ui/public/logo_white.png" alt="Logo" width="auto" height="90">
  </a>
  <p align="center">
    An opensource dApp to mint and showcase NFT on MoonRiver, MoonBeam and MoonBase blockchain
    <br />
    <a href="https://cassavaland.io">View Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

<div style="padding:48.02% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/717736971?h=0dde70ebd8&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="New Recording - 6/7/2022, 3:42:35 AM"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>

CassavaLand is a platform that allows users to create, explore and sell extra-ordinary NFTs across multiple blockchains. The platform allows users to import their existing NFT collection, customize their profile and share to friends on social media.

We are currently indexing all NFTs on Binance chain, Boba network, moonbeam, moon base alpha and moon river network.

| Network             | Endpoint                                                                   |
| ------------------- | -------------------------------------------------------------------------- |
| Moon base alpha     | https://thegraph.com/hosted-service/subgraph/iphyman/cassavaland-moonbase  |
| Moonbeam            | https://thegraph.com/hosted-service/subgraph/iphyman/cassavaland-moonbeam  |
| Moon river          | https://thegraph.com/hosted-service/subgraph/iphyman/cassavaland-moonriver |
| Binance Smart Chain | https://api.thegraph.com/subgraphs/name/iphyman/rare-cassava               |
| Boba Network        | https://api.thegraph.com/subgraphs/name/iphyman/cassavaland-boba           |

### Built With

- [Next.js](https://nextjs.org/)
- [Nx](https://nx.dev)
- [Pinata](https://nx.dev)
- [React.js](https://reactjs.org/)
- [NodeJS](https://nodejs.org/)
- [Lingui](https://lingui.js.org/)
- [MongoDB](https://mongodb.com/)
- [Thegraph](https://thegraph.com/)

<!-- GETTING STARTED -->

## Getting Started

To get started developing the project, you need to have the latest stable node and npm or yarn versions installed.

### Installation

1. Get a free API Key at [Pinata](https://www.pinata.cloud/)
2. Clone the repo
   ```sh
   git clone https://github.com/cassavaland/mint-showcase.git
   ```
3. Install NPM packages
   ```sh
   yarn
   ```
4. Create and populate a .env.local file with the required credentials
5. To server the UI run

```sh
nx serve ui --dev
```

## Roadmap

- [x] Minting
- [x] Showcase
- [ ] Marketplace
  - [ ] Auction
  - [ ] Buy Now
  - [ ] Offer

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/supportAcala`)
3. Commit your Changes (`git commit -m 'Add some supportAcala'`)
4. Push to the Branch (`git push origin feature/supportAcala`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

- Twitter - [@cassavaland](https://twitter.com/cassavaland)
- Discord - @iphyman#9280
