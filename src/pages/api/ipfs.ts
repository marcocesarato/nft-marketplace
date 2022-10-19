import axios from "axios";

async function handler(req, res) {
	try {
		const response = await axios.get(req.query.cid, {
			timeout: 5000,
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
		//console.error("Error fetching file: ", error);
		res.end();
	}
}

export default handler;
