import {withIronSessionApiRoute} from "iron-session/next";
import {NextApiRequest, NextApiResponse} from "next";

import {sessionOptions} from "@configs/session";

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
	req.session.destroy();
	res.json({account: "", isLogged: false});
}
