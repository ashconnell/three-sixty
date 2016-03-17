var FileSaver = require('./libs/FileSaver.min');

function ThreeSixtyFile (data) {
    this.data = data;
    this._saveListeners = [];
}

ThreeSixtyFile.prototype._setBlob = function (blob) {
    this.blob = blob;

    if (this._saveListeners.length) {
        while (this._saveListeners.length) {
            var listener = this._saveListeners.pop();
            listener.bind(this)(blob);
        }
    }
}

ThreeSixtyFile.prototype.save = function (filename) {
    if (this.blob) {
        this._saveBlob(this.blob, filename);
    } else {
        this._addSaveListener(filename);
    }
}

ThreeSixtyFile.prototype.open = function () {
    window.open(this.data);
}

ThreeSixtyFile.prototype._saveBlob = function (blob, filename) {
    FileSaver.saveAs(blob, filename || 'three-sixty.png');
}

ThreeSixtyFile.prototype._addSaveListener = function (filename) {
    this._saveListeners.push(function (blob) {
        this._saveBlob(blob, filename);
    });
}

module.exports = ThreeSixtyFile;
