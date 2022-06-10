import axios from "axios";

async function handler(req, res) {
	try {
		console.log(req.query.cid);
		const response = await axios.get(req.query.cid, {
			responseType: "arraybuffer",
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "*",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Expose-Headers": "*",
				"Access-Control-Max-Age": "*",
			},
		});
		res.setHeader("Content-Type", response.headers["content-type"]);
		res.setHeader("Content-Length", response.headers["content-length"]);
		return res.send(response.data);
	} catch (error) {
		console.error("Error fetching file: ", error);
	}
}

export default handler;
