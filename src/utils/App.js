import * as appRouters from "../modules/app.routes.js"
import cors from 'cors'
import globalErrorHandling from "./error_handling.js";
import Connectiondb from "../../db/Connectiondb.js";
import path from "path";
import { fileURLToPath } from "url";


const App = (app, express) => {
    app.use(express.json({}))
    app.use(cors())
    Connectiondb()
    const __dirName = path.dirname(fileURLToPath(import.meta.url))
    const fullPath = path.join(__dirName, `../../public`)
    // if (fs.existsSync(fullPath)) {
    //     fs.mkdirSync(fullPath, { recursive: true })
    // }
    
    // console.log("__dirname", __dirName);
    // console.log("fullPath", fullPath);
    
    
    // ===================================================================
    app.use("/uploads", express.static(path.join(fullPath, `uploads`)))
    // app.use("/uploads", express.static("uploads"))
    // app.use("/images",express.static(path.join(process.cwd(), "public", "images")));
    app.use("/user", appRouters.userRouter)
    app.use("/movie", appRouters.movieRouter)
    app.get('/', (req, res) => res.send('Welcome to our World '))
    //============================================================ routing
    app.use(globalErrorHandling)
}


export default App