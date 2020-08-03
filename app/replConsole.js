let repl = require("repl");

// Get ANSI color header based on config
let redColorValue = parseInt(process.env.CONSOLE_LOG_COLOR.substr(0, 2), 16);
let greenColorValue = parseInt(process.env.CONSOLE_LOG_COLOR.substr(2, 2), 16);
let blueColorValue = parseInt(process.env.CONSOLE_LOG_COLOR.substr(4, 2), 16);
if (
    isNaN(redColorValue) ||
    isNaN(greenColorValue) ||
    isNaN(blueColorValue)
) {
    redColorValue = 0;
    greenColorValue = 255;
    blueColorValue = 0;
}
let ANSI_COLOR_HEADER = `\x1B[38;2;${redColorValue};${greenColorValue};${blueColorValue}m`;

global.replConsole = repl.start({
    prompt: `${ANSI_COLOR_HEADER}localhost@c3c:js# `,
    terminal: true,
    useColors: true,
    breakEvalOnSigint: true,
    preview: true,
    useGlobal: true,
    completer: function completer(line) {
        let cList = Object.keys(global);
        let hits = cList.filter(c => c.startsWith(line));
        return [hits.length ? hits : cList, hits.length === 1 ? hits[0] : line];
    }
});
