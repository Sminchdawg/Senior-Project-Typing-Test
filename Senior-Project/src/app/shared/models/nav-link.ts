export class NavLink {
  constructor(label: string, path: string, icon?: string) {
    this.label = label;
    this.path = path;
    this.icon = icon;
  }

  label: string;

  path: string;

  icon: string;
}
