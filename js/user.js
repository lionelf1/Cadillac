var HeaderVideo = function(settings) {
    if (settings.element.length === 0) {
        return;
    }
    this.init(settings);
};

HeaderVideo.prototype.init = function(settings) {
    this.$element = $(settings.element);
    this.settings = settings;
    this.videoDetails = this.getVideoDetails();
};

$('.header-video').each(function(i, elem) {
    headerVideo = new HeaderVideo({
      element: elem,
      media: '.header-video__media',
      playTrigger: '.header-video__play-trigger',
      closeTrigger: '.header-video__close-trigger'
    });
});

HeaderVideo.prototype.getVideoDetails = function() {
    var mediaElement = $(this.settings.media);

    return {
        videoURL: mediaElement.attr('data-video-URL'),
        teaser: mediaElement.attr('data-teaser'),
        videoHeight: mediaElement.attr('data-video-height'),
        videoWidth: mediaElement.attr('data-video-width')
    };
};

HeaderVideo.prototype.setFluidContainer = function() {
    var element = this.$element;
    element.data('aspectRatio', this.videoDetails.videoHeight / this.videoDetails.videoWidth);

    $(window).resize(function() {
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();

        element.width(Math.ceil(windowWidth));
        element.height(Math.ceil(windowWidth * element.data('aspectRatio'))); //Set the videos aspect ratio, see https://css-tricks.com/fluid-width-youtube-videos/

        if(windowHeight < element.height()) {
            element.width(Math.ceil(windowWidth));
            element.height(Math.ceil(windowHeight));
        }
    }).trigger('resize');
};

HeaderVideo.prototype.appendIframe = function() {
    var html = '<iframe id="header-video__video-element" src="'+this.videoDetails.videoURL+'?rel=0&hd=1&autohide=1&showinfo=0&autoplay=1&enablejsapi=1&origin=*" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    this.$element.append(html);
};

HeaderVideo.prototype.appendTeaserVideo = function() {
    var source = this.videoDetails.teaser;
    var html = '<video autoplay="true" loop="true" muted id="header-video__teaser-video" class="header-video__teaser-video"><source src="'+source+'.webm" type="video/mp4"><source src="'+source+'.mp4" type="video/mp4"></video>';
    this.$element.append(html);
};