const formHtml = await Bun.file("./form.html").text();

const server = Bun.serve({
    port: 3000,
    async fetch(request, server) {
        const url = new URL(request.url);
        const method = request.method;

        if (url.pathname === '/') {
            return new Response(
                formHtml, {
                    headers: {
                        "content-type": "text/html"
                    }
                }
            );
        } else if(url.pathname === '/data' && method === 'POST') {
            const data = await request.text().then((body) => {
                const param = new URLSearchParams(body);
                return param;
            })
            console.log(data);

            return new Response("POST request made");
        } else {
            return new Response("Hello World!");
        }
    },
})

console.log(`http://${server.hostname}:${server.port}`);