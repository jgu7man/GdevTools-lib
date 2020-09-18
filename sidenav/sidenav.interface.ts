export interface SidenavNode {
    name: string,
    routeId: string,
    route?: string,
    childs?: SidenavNode[]
}