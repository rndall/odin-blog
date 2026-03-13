import app from "@/app";
import { env } from "@/config";

const PORT = env.PORT;

const initServer = () => {
	app.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});
};

initServer();
