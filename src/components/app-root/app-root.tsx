import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: true,
})
export class AppRoot {
  constructor() {
    this.test();
  }

  render() {
    return (
      <Host>
        <header>
          <h1>Game Guru</h1>
          <h2>Find a game that fits your group</h2>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="home-page" exact={true} />
              {/* <stencil-route url="/profile" component="app-profile" exact={true} />
              <stencil-route url="/profile/" component="app-profile" exact={true} />
              <stencil-route url="/profile/:name" component="app-profile" /> */}
            </stencil-route-switch>
          </stencil-router>
        </main>
      </Host>
    );
  }

  public async test(): Promise<void> {
    let response = await fetch('http://localhost:3000/api/games', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let responseBody = await response.json();

    console.log(responseBody);
  }
}
