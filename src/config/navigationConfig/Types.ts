interface IBaseNavItem {
    _id: string;
    slug: string;
    title: string;
    icon?: string;
}

interface INavItemWithComponent {
    PageComponent: any;
}

export type TNavigateItemConfig = IBaseNavItem &
    Required<
        | INavItemWithComponent
        | {
              children: TNavigateItemConfig[];
          }
    >;

export type TNavigateItem = IBaseNavItem &
    Partial<
        INavItemWithComponent & {
            children: TNavigateItem[];
        }
    >;

export type TNavigationConfig = {
    IndexPageComponent: any;
    children: TNavigateItem[];
};
