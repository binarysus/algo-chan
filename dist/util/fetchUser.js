import fetch from "node-fetch";
import urls from "../constants/urls";
function fetchUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = urls.BINARYSEARCH_API.replace("USERNAME", username);
        const data = yield fetch(url).then(res => res.json());
        if ("user" in data)
            return data;
        return null;
    });
}
export default fetchUser;
