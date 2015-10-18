# BoilerMake 2015

### In the beginning
When teaming with three equally experienced developers at a hackathon, you trust that the event atmosphere will provide both the motivation and creative space to brainstorm something *innovative* or at very least worthwhile. This was simply not the case.

It was 3:45 in the morning when we set an alarm to decide on an idea. As if we had just eaten Taco Bell, we began comically excreting ideas within minutes of the deadline, each more entertaining than the next. Remember all those god-awful pieces of code documentation that everyone definitely laughs at? What if those webpages, no longer, could pretend to be coherent? How about providing web-surfers with a **platform-neutral utility** to critique content regardless of context? At long last, we had it.

### The Idea
Web Roast is primarily a chrome extension that unearths a *hidden social network* that spans the entire web. On each page, it displays a score as a badge on the icon based on the votes of previous venturers. The user can also click the icon to see comments that others have left behind. In addition, we provide a central website to displays some basic statistics about the network.

### ...gimme them specs
On the back-end, we employ Flask to interact with the core extension as well as the website. As for the database, we felt a relational schema worked best so we took advantage of PostGreSQL for the structure of MySQL with added functionality. In the meantime, our front-end design is from scratch, only using basic resources like jQuery and FontAwesome because, admittedly, they are awesome.
