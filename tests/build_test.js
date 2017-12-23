
Feature('Build');

Scenario('validate CSS', (I) => {
    I.checkFile('css', 'main.css');
});

Scenario('validate HTML', (I) => {
    I.checkFile('views', 'index.html');
});

Scenario('validate JavaScript', (I) => {
    I.checkFile('js', 'main.js');
});

Scenario('validate Images', (I) => {
    I.checkFile('images', 'logo.png');
});

Scenario('validate Sprites', (I) => {
    I.checkFile('images', 'social.png');
});

Scenario('validate copying files', (I) => {
    I.checkFile('', 'favicon.ico');
});
