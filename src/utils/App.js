import * as appRouters from "../modules/app.routes.js"
import cors from 'cors'
import globalErrorHandling from "./error_handling.js";
import Connectiondb from "../../db/Connectiondb.js";







const App = (app, express) => {
    app.use(express.json({}))
    app.use(cors())
    Connectiondb()
    // ===================================================================
    // app.use("/uploads/images", express.static(path.join(__dirName, "../uploads/images")))
    app.use("/uploads", express.static("uploads"))
    app.use("/user", appRouters.userRouter)
    app.use("/movie", appRouters.movieRouter)
    app.get('/', (req, res) => res.send('Welcome to our World '))
    //============================================================ routing
    app.use(globalErrorHandling)
}


export default App