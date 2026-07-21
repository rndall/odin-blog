import type { IconSvgElement } from "@hugeicons/react"
import type { LinkComponentProps } from "@tanstack/react-router"

export interface NavItem {
	title: string
	to: LinkComponentProps["to"]
	search?: LinkComponentProps["search"]
	icon: IconSvgElement
}
