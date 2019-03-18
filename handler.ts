import * as bodyParser from 'body-parser';
import * as express from 'serverless-express/express';
import * as handler from 'serverless-express/handler';

// svg2png
import * as svg2png from 'svg2png';


//////////////////////////////////////////////////

const app: express.Application = express();

app.use(bodyParser.json({ strict: false }));
app.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next()
});

const github_header_svg = (str:string, forground:string, background:string) => {
    const result = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="170">
<style xmlns="http://www.w3.org/2000/svg" type="text/css">
@import url('https://fonts.googleapis.com/css?family=Sarabun:100');
text {font-size: 70px; font-family: 'Sarabun', sans-serif; font-weight: 100;}
</style>
<g>
<rect x="0" y="0" width="100%" height="100%" fill="#${background}"></rect>
</g>
<g fill="#${forground}" font-family="Open Sans">
<text x="90" y="120" font-size="50">${str}</text>
</g>
</svg>`;
    return result;
};

//////////////////////////////////////////////////

app.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
    res.json({apis : "/hello"});
});

app.get('/hello', async (req: express.Request, res: express.Response): Promise<void> => {
    res.json({message : "hello world"});
});

//////////////////////////////////////////////////

app.get('/header/:str.svg', async (req: express.Request, res: express.Response): Promise<void> => {
    const str = req.params.str || 'Unknown';
    const forground = req.query.forground || 'FFF';
    const background = req.query.background || '222';

    res.type('svg');
    res.send(github_header_svg(str, forground, background));
});

app.get('/header/:str.png', function(req: express.Request, res: express.Response) {
    const str = req.params.str || 'Unknown';
    const forground = req.query.forground || 'FFF';
    const background = req.query.background || '222';

    res.type('png');
    res.end(svg2png.sync(github_header_svg(str, forground, background)));
});

//////////////////////////////////////////////////

exports.api = handler(app);
