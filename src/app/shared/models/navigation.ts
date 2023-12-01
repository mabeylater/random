import { MatListItem } from "@angular/material/list"

export interface AppNavigationSections {
  main: NavigationElement[];
  snippets: NavigationElement[];
  games: NavigationElement[];
  [key: string]: NavigationElement[];
}

export interface NavigationElement {
  title: string;
  icon: string;
  path: string;
  pathMatchExact?: boolean;
}

export interface NavigationChangeEvent {
  listItem: MatListItem;
  navEl: NavigationElement;
}

export const appNavigation: AppNavigationSections = {
  main: [
    {
      title: 'Home',
      icon: 'home',
      path: '',
      pathMatchExact: true
    },
    {
      title: 'Games',
      icon: 'games',
      path: 'games',
    },
    {
      title: 'Snippets',
      icon: 'code',
      path: 'snippets',
    },
    {
      icon: 'monitor_heart',
      path: 'bp-tracking',
      title: 'BP Tracking'
    }
  ],
  snippets: [
    {
      path: '/snippets',
      pathMatchExact: true,
      icon: 'code',
      title: 'Snippets'
    },
    {
      path: '/snippets/angular',
      pathMatchExact: true,
      icon: 'data_object',
      title: 'Angular'
    },
    {
      path: '/snippets/powershell',
      pathMatchExact: true,
      icon: 'terminal',
      title: 'PowerShell'
    },
    {
      path: '/snippets/stylesheets',
      pathMatchExact: true,
      icon: 'css',
      title: 'Style Sheets'
    }
  ],
  games: [
    {
      icon: 'games',
      pathMatchExact: true,
      path: '/games',
      title: 'Games'
    },
    {
      icon: 'content_cut',
      pathMatchExact: true,
      path: '/games/rock-paper-scissors',
      title: 'Rock, Paper, Scissors'
    },
    {
      icon: 'tag',
      pathMatchExact: true,
      path: '/games/tic-tac-toe',
      title: 'Tic Tac Toe'
    }
  ],
  bp: [
    {
      icon: 'monitor_heart',
      pathMatchExact: true,
      path: '/bp-tracking',
      title: 'BP Tracking'
    },
    {
      icon: 'event',
      pathMatchExact: true,
      path: '/bp-tracking/11-03-2023',
      title: '11-03-2023'
    },
    {
      icon: 'event',
      pathMatchExact: true,
      path: '/bp-tracking/10-27-2023',
      title: '10-27-2023'
    },
    {
      icon: 'event',
      pathMatchExact: true,
      path: '/bp-tracking/10-20-2023',
      title: '10-20-2023'
    },
    {
      icon: 'event',
      pathMatchExact: true,
      path: '/bp-tracking/10-16-2023',
      title: '10-16-2023'
    },
    {
      icon: 'event',
      pathMatchExact: true,
      path: '/bp-tracking/10-13-2023',
      title: '10-13-2023'
    },
    {
      icon: 'event',
      pathMatchExact: true,
      path: '/bp-tracking/10-09-2023',
      title: '10-09-2023'
    },
    {
      icon: 'event',
      pathMatchExact: true,
      path: '/bp-tracking/10-04-2023',
      title: '10-04-2023'
    },
    {
      icon: 'event',
      pathMatchExact: true,
      path: '/bp-tracking/10-02-2023',
      title: '10-02-2023'
    },
    {
      icon: 'event',
      pathMatchExact: true,
      path: '/bp-tracking/09-29-2023',
      title: '09-29-2023'
    },
    {
      icon: 'event',
      pathMatchExact: true,
      path: '/bp-tracking/09-27-2023',
      title: '09-27-2023'
    }
  ]
}
