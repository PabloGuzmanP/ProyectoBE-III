import Path from "path";

const __filename = new URL(import.meta.url).pathname;
const __dirname = Path.dirname(__filename);

const paths = {
    env: Path.join(Path.dirname(""), ".env"),
    src: Path.join(Path.dirname(""), "src"),
    public: Path.join(Path.dirname(""), "src", "public"),
};

export default paths;