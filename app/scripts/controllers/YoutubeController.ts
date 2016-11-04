import { Controller } from '../lib/Controller';
import { shim } from '../shims/Shim';

export class YoutubeController extends Controller {

    static selector: string = '[data-youtube]';

    static REPLACE_ELEMENT_SELECTOR: string = '[data-youtube-element]';

    static YT: any;

    private timer: number;

    private player: any;

    constructor(element: HTMLElement) {
        super(element);
        this.initPlayer();
    }

    initPlayer() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            if (typeof (shim('YT')) === 'undefined' || typeof (shim('YT').Player) === 'undefined') {
                if(document.querySelectorAll('#youtube-iframe-api').length <= 0) {
                    let tag = document.createElement('script');
                    tag.src = 'https://www.youtube.com/iframe_api';
                    tag.id = 'youtube-iframe-api';
                    let firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                }
                this.initPlayer();
            } else {
                YoutubeController.YT = shim('YT');
                this.onYouTubePlayerReady();
            }
        }, 50);
    }

    onYouTubePlayerReady() {
        let toReplaceElement = this.$().querySelector(YoutubeController.REPLACE_ELEMENT_SELECTOR);
        if (toReplaceElement) {
            this.player = new YoutubeController.YT.Player(toReplaceElement, {
            height: '580px',
            width: '100%',
            videoId: this.$().getAttribute('data-youtube'),
            events: {
                'onReady': () => { this.onPlayerReady(); },
                'onStateChange': () => { this.onPlayerStateChange(); }
            }
            });
        } else {
            throw Error('Couldn\'t initialize Video (' + this.$().getAttribute('data-youtube') + '). No Element with the Selector ' + YoutubeController.REPLACE_ELEMENT_SELECTOR + ' found.');
        }
    }

    onPlayerReady() {

    }

    onPlayerStateChange() {

    }
}