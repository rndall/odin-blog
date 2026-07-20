const APP_NAME = "The Digital Atelier"

export const pageTitle = (title?: string) => {
	return title ? `${title} | ${APP_NAME}` : APP_NAME
}
