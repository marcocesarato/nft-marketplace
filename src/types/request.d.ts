import type {File} from "multiparty";
import {NextApiRequest} from "next";

interface NextApiRequestFiles extends NextApiRequest {
	files: {[key: string]: File[]};
}
