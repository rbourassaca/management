import { writable } from "svelte/store";

const trail: {
    name: string;
    href?: undefined | string;
}[] = [{ name: "Accueil" }]

export const breadcrumbStore = writable(trail);