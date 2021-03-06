(function() {
	var debug = false;
	var root = this;
	var EXIF = function(obj) {
		if (obj instanceof EXIF) return obj;
		if (!(this instanceof EXIF)) return new EXIF(obj);
		this.EXIFwrapped = obj
	};
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = EXIF
		}
		exports.EXIF = EXIF
	} else {
		root.EXIF = EXIF
	}
	var ExifTags = EXIF.Tags = {
		0x9000: "ExifVersion",
		0xA000: "FlashpixVersion",
		0xA001: "ColorSpace",
		0xA002: "PixelXDimension",
		0xA003: "PixelYDimension",
		0x9101: "ComponentsConfiguration",
		0x9102: "CompressedBitsPerPixel",
		0x927C: "MakerNote",
		0x9286: "UserComment",
		0xA004: "RelatedSoundFile",
		0x9003: "DateTimeOriginal",
		0x9004: "DateTimeDigitized",
		0x9290: "SubsecTime",
		0x9291: "SubsecTimeOriginal",
		0x9292: "SubsecTimeDigitized",
		0x829A: "ExposureTime",
		0x829D: "FNumber",
		0x8822: "ExposureProgram",
		0x8824: "SpectralSensitivity",
		0x8827: "ISOSpeedRatings",
		0x8828: "OECF",
		0x9201: "ShutterSpeedValue",
		0x9202: "ApertureValue",
		0x9203: "BrightnessValue",
		0x9204: "ExposureBias",
		0x9205: "MaxApertureValue",
		0x9206: "SubjectDistance",
		0x9207: "MeteringMode",
		0x9208: "LightSource",
		0x9209: "Flash",
		0x9214: "SubjectArea",
		0x920A: "FocalLength",
		0xA20B: "FlashEnergy",
		0xA20C: "SpatialFrequencyResponse",
		0xA20E: "FocalPlaneXResolution",
		0xA20F: "FocalPlaneYResolution",
		0xA210: "FocalPlaneResolutionUnit",
		0xA214: "SubjectLocation",
		0xA215: "ExposureIndex",
		0xA217: "SensingMethod",
		0xA300: "FileSource",
		0xA301: "SceneType",
		0xA302: "CFAPattern",
		0xA401: "CustomRendered",
		0xA402: "ExposureMode",
		0xA403: "WhiteBalance",
		0xA404: "DigitalZoomRation",
		0xA405: "FocalLengthIn35mmFilm",
		0xA406: "SceneCaptureType",
		0xA407: "GainControl",
		0xA408: "Contrast",
		0xA409: "Saturation",
		0xA40A: "Sharpness",
		0xA40B: "DeviceSettingDescription",
		0xA40C: "SubjectDistanceRange",
		0xA005: "InteroperabilityIFDPointer",
		0xA420: "ImageUniqueID"
	};
	var TiffTags = EXIF.TiffTags = {
		0x0100: "ImageWidth",
		0x0101: "ImageHeight",
		0x8769: "ExifIFDPointer",
		0x8825: "GPSInfoIFDPointer",
		0xA005: "InteroperabilityIFDPointer",
		0x0102: "BitsPerSample",
		0x0103: "Compression",
		0x0106: "PhotometricInterpretation",
		0x0112: "Orientation",
		0x0115: "SamplesPerPixel",
		0x011C: "PlanarConfiguration",
		0x0212: "YCbCrSubSampling",
		0x0213: "YCbCrPositioning",
		0x011A: "XResolution",
		0x011B: "YResolution",
		0x0128: "ResolutionUnit",
		0x0111: "StripOffsets",
		0x0116: "RowsPerStrip",
		0x0117: "StripByteCounts",
		0x0201: "JPEGInterchangeFormat",
		0x0202: "JPEGInterchangeFormatLength",
		0x012D: "TransferFunction",
		0x013E: "WhitePoint",
		0x013F: "PrimaryChromaticities",
		0x0211: "YCbCrCoefficients",
		0x0214: "ReferenceBlackWhite",
		0x0132: "DateTime",
		0x010E: "ImageDescription",
		0x010F: "Make",
		0x0110: "Model",
		0x0131: "Software",
		0x013B: "Artist",
		0x8298: "Copyright"
	};
	var GPSTags = EXIF.GPSTags = {
		0x0000: "GPSVersionID",
		0x0001: "GPSLatitudeRef",
		0x0002: "GPSLatitude",
		0x0003: "GPSLongitudeRef",
		0x0004: "GPSLongitude",
		0x0005: "GPSAltitudeRef",
		0x0006: "GPSAltitude",
		0x0007: "GPSTimeStamp",
		0x0008: "GPSSatellites",
		0x0009: "GPSStatus",
		0x000A: "GPSMeasureMode",
		0x000B: "GPSDOP",
		0x000C: "GPSSpeedRef",
		0x000D: "GPSSpeed",
		0x000E: "GPSTrackRef",
		0x000F: "GPSTrack",
		0x0010: "GPSImgDirectionRef",
		0x0011: "GPSImgDirection",
		0x0012: "GPSMapDatum",
		0x0013: "GPSDestLatitudeRef",
		0x0014: "GPSDestLatitude",
		0x0015: "GPSDestLongitudeRef",
		0x0016: "GPSDestLongitude",
		0x0017: "GPSDestBearingRef",
		0x0018: "GPSDestBearing",
		0x0019: "GPSDestDistanceRef",
		0x001A: "GPSDestDistance",
		0x001B: "GPSProcessingMethod",
		0x001C: "GPSAreaInformation",
		0x001D: "GPSDateStamp",
		0x001E: "GPSDifferential"
	};
	var StringValues = EXIF.StringValues = {
		ExposureProgram: {
			0: "Not defined",
			1: "Manual",
			2: "Normal program",
			3: "Aperture priority",
			4: "Shutter priority",
			5: "Creative program",
			6: "Action program",
			7: "Portrait mode",
			8: "Landscape mode"
		},
		MeteringMode: {
			0: "Unknown",
			1: "Average",
			2: "CenterWeightedAverage",
			3: "Spot",
			4: "MultiSpot",
			5: "Pattern",
			6: "Partial",
			255: "Other"
		},
		LightSource: {
			0: "Unknown",
			1: "Daylight",
			2: "Fluorescent",
			3: "Tungsten (incandescent light)",
			4: "Flash",
			9: "Fine weather",
			10: "Cloudy weather",
			11: "Shade",
			12: "Daylight fluorescent (D 5700 - 7100K)",
			13: "Day white fluorescent (N 4600 - 5400K)",
			14: "Cool white fluorescent (W 3900 - 4500K)",
			15: "White fluorescent (WW 3200 - 3700K)",
			17: "Standard light A",
			18: "Standard light B",
			19: "Standard light C",
			20: "D55",
			21: "D65",
			22: "D75",
			23: "D50",
			24: "ISO studio tungsten",
			255: "Other"
		},
		Flash: {
			0x0000: "Flash did not fire",
			0x0001: "Flash fired",
			0x0005: "Strobe return light not detected",
			0x0007: "Strobe return light detected",
			0x0009: "Flash fired, compulsory flash mode",
			0x000D: "Flash fired, compulsory flash mode, return light not detected",
			0x000F: "Flash fired, compulsory flash mode, return light detected",
			0x0010: "Flash did not fire, compulsory flash mode",
			0x0018: "Flash did not fire, auto mode",
			0x0019: "Flash fired, auto mode",
			0x001D: "Flash fired, auto mode, return light not detected",
			0x001F: "Flash fired, auto mode, return light detected",
			0x0020: "No flash function",
			0x0041: "Flash fired, red-eye reduction mode",
			0x0045: "Flash fired, red-eye reduction mode, return light not detected",
			0x0047: "Flash fired, red-eye reduction mode, return light detected",
			0x0049: "Flash fired, compulsory flash mode, red-eye reduction mode",
			0x004D: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
			0x004F: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
			0x0059: "Flash fired, auto mode, red-eye reduction mode",
			0x005D: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
			0x005F: "Flash fired, auto mode, return light detected, red-eye reduction mode"
		},
		SensingMethod: {
			1: "Not defined",
			2: "One-chip color area sensor",
			3: "Two-chip color area sensor",
			4: "Three-chip color area sensor",
			5: "Color sequential area sensor",
			7: "Trilinear sensor",
			8: "Color sequential linear sensor"
		},
		SceneCaptureType: {
			0: "Standard",
			1: "Landscape",
			2: "Portrait",
			3: "Night scene"
		},
		SceneType: {
			1: "Directly photographed"
		},
		CustomRendered: {
			0: "Normal process",
			1: "Custom process"
		},
		WhiteBalance: {
			0: "Auto white balance",
			1: "Manual white balance"
		},
		GainControl: {
			0: "None",
			1: "Low gain up",
			2: "High gain up",
			3: "Low gain down",
			4: "High gain down"
		},
		Contrast: {
			0: "Normal",
			1: "Soft",
			2: "Hard"
		},
		Saturation: {
			0: "Normal",
			1: "Low saturation",
			2: "High saturation"
		},
		Sharpness: {
			0: "Normal",
			1: "Soft",
			2: "Hard"
		},
		SubjectDistanceRange: {
			0: "Unknown",
			1: "Macro",
			2: "Close view",
			3: "Distant view"
		},
		FileSource: {
			3: "DSC"
		},
		Components: {
			0: "",
			1: "Y",
			2: "Cb",
			3: "Cr",
			4: "R",
			5: "G",
			6: "B"
		}
	};

	function addEvent(element, event, handler) {
		if (element.addEventListener) {
			element.addEventListener(event, handler, false)
		} else if (element.attachEvent) {
			element.attachEvent("on" + event, handler)
		}
	}

	function imageHasData(img) {
		return !!(img.exifdata)
	}

	function base64ToArrayBuffer(base64, contentType) {
		contentType = contentType || base64.match(/^data\:([^\;]+)\;base64,/mi)[1] || '';
		base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
		var binary = atob(base64);
		var len = binary.length;
		var buffer = new ArrayBuffer(len);
		var view = new Uint8Array(buffer);
		for (var i = 0; i < len; i++) {
			view[i] = binary.charCodeAt(i)
		}
		return buffer
	}

	function objectURLToBlob(url, callback) {
		var http = new XMLHttpRequest();
		http.open("GET", url, true);
		http.responseType = "blob";
		http.onload = function(e) {
			if (this.status == 200 || this.status === 0) {
				callback(this.response)
			}
		};
		http.send()
	}

	function getImageData(img, callback) {
		function handleBinaryFile(binFile) {
			var data = findEXIFinJPEG(binFile);
			var iptcdata = findIPTCinJPEG(binFile);
			img.exifdata = data || {};
			img.iptcdata = iptcdata || {};
			if (callback) {
				callback.call(img)
			}
		}
		if (img.src) {
			if (/^data\:/i.test(img.src)) {
				var arrayBuffer = base64ToArrayBuffer(img.src);
				handleBinaryFile(arrayBuffer)
			} else if (/^blob\:/i.test(img.src)) {
				var fileReader = new FileReader();
				fileReader.onload = function(e) {
					handleBinaryFile(e.target.result)
				};
				objectURLToBlob(img.src, function(blob) {
					fileReader.readAsArrayBuffer(blob)
				})
			} else {
				var http = new XMLHttpRequest();
				http.onload = function() {
					if (this.status == 200 || this.status === 0) {
						handleBinaryFile(http.response)
					} else {
						throw "Could not load image";
					}
					http = null
				};
				http.open("GET", img.src, true);
				http.responseType = "arraybuffer";
				http.send(null)
			}
		} else if (window.FileReader && (img instanceof window.Blob || img instanceof window.File)) {
			var fileReader = new FileReader();
			fileReader.onload = function(e) {
				if (debug) console.log("Got file of length " + e.target.result.byteLength);
				handleBinaryFile(e.target.result)
			};
			fileReader.readAsArrayBuffer(img)
		}
	}

	function findEXIFinJPEG(file) {
		var dataView = new DataView(file);
		if (debug) console.log("Got file of length " + file.byteLength);
		if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
			if (debug) console.log("Not a valid JPEG");
			return false
		}
		var offset = 2,
			length = file.byteLength,
			marker;
		while (offset < length) {
			if (dataView.getUint8(offset) != 0xFF) {
				if (debug) console.log("Not a valid marker at offset " + offset + ", found: " + dataView.getUint8(offset));
				return false
			}
			marker = dataView.getUint8(offset + 1);
			if (debug) console.log(marker);
			if (marker == 225) {
				if (debug) console.log("Found 0xFFE1 marker");
				return readEXIFData(dataView, offset + 4, dataView.getUint16(offset + 2) - 2)
			} else {
				offset += 2 + dataView.getUint16(offset + 2)
			}
		}
	}

	function findIPTCinJPEG(file) {
		var dataView = new DataView(file);
		if (debug) console.log("Got file of length " + file.byteLength);
		if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
			if (debug) console.log("Not a valid JPEG");
			return false
		}
		var offset = 2,
			length = file.byteLength;
		var isFieldSegmentStart = function(dataView, offset) {
			return (dataView.getUint8(offset) === 0x38 && dataView.getUint8(offset + 1) === 0x42 && dataView.getUint8(offset + 2) === 0x49 && dataView.getUint8(offset + 3) === 0x4D && dataView.getUint8(offset + 4) === 0x04 && dataView.getUint8(offset + 5) === 0x04)
		};
		while (offset < length) {
			if (isFieldSegmentStart(dataView, offset)) {
				var nameHeaderLength = dataView.getUint8(offset + 7);
				if (nameHeaderLength % 2 !== 0) nameHeaderLength += 1;
				if (nameHeaderLength === 0) {
					nameHeaderLength = 4
				}
				var startOffset = offset + 8 + nameHeaderLength;
				var sectionLength = dataView.getUint16(offset + 6 + nameHeaderLength);
				return readIPTCData(file, startOffset, sectionLength);
				break
			}
			offset++
		}
	}
	var IptcFieldMap = {
		0x78: 'caption',
		0x6E: 'credit',
		0x19: 'keywords',
		0x37: 'dateCreated',
		0x50: 'byline',
		0x55: 'bylineTitle',
		0x7A: 'captionWriter',
		0x69: 'headline',
		0x74: 'copyright',
		0x0F: 'category'
	};

	function readIPTCData(file, startOffset, sectionLength) {
		var dataView = new DataView(file);
		var data = {};
		var fieldValue, fieldName, dataSize, segmentType, segmentSize;
		var segmentStartPos = startOffset;
		while (segmentStartPos < startOffset + sectionLength) {
			if (dataView.getUint8(segmentStartPos) === 0x1C && dataView.getUint8(segmentStartPos + 1) === 0x02) {
				segmentType = dataView.getUint8(segmentStartPos + 2);
				if (segmentType in IptcFieldMap) {
					dataSize = dataView.getInt16(segmentStartPos + 3);
					segmentSize = dataSize + 5;
					fieldName = IptcFieldMap[segmentType];
					fieldValue = getStringFromDB(dataView, segmentStartPos + 5, dataSize);
					if (data.hasOwnProperty(fieldName)) {
						if (data[fieldName] instanceof Array) {
							data[fieldName].push(fieldValue)
						} else {
							data[fieldName] = [data[fieldName], fieldValue]
						}
					} else {
						data[fieldName] = fieldValue
					}
				}
			}
			segmentStartPos++
		}
		return data
	}

	function readTags(file, tiffStart, dirStart, strings, bigEnd) {
		var entries = file.getUint16(dirStart, !bigEnd),
			tags = {},
			entryOffset, tag, i;
		for (i = 0; i < entries; i++) {
			entryOffset = dirStart + i * 12 + 2;
			tag = strings[file.getUint16(entryOffset, !bigEnd)];
			if (!tag && debug) console.log("Unknown tag: " + file.getUint16(entryOffset, !bigEnd));
			tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd)
		}
		return tags
	}

	function readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
		var type = file.getUint16(entryOffset + 2, !bigEnd),
			numValues = file.getUint32(entryOffset + 4, !bigEnd),
			valueOffset = file.getUint32(entryOffset + 8, !bigEnd) + tiffStart,
			offset, vals, val, n, numerator, denominator;
		switch (type) {
			case 1:
			case 7:
				if (numValues == 1) {
					return file.getUint8(entryOffset + 8, !bigEnd)
				} else {
					offset = numValues > 4 ? valueOffset : (entryOffset + 8);
					vals = [];
					for (n = 0; n < numValues; n++) {
						vals[n] = file.getUint8(offset + n)
					}
					return vals
				}
			case 2:
				offset = numValues > 4 ? valueOffset : (entryOffset + 8);
				return getStringFromDB(file, offset, numValues - 1);
			case 3:
				if (numValues == 1) {
					return file.getUint16(entryOffset + 8, !bigEnd)
				} else {
					offset = numValues > 2 ? valueOffset : (entryOffset + 8);
					vals = [];
					for (n = 0; n < numValues; n++) {
						vals[n] = file.getUint16(offset + 2 * n, !bigEnd)
					}
					return vals
				}
			case 4:
				if (numValues == 1) {
					return file.getUint32(entryOffset + 8, !bigEnd)
				} else {
					vals = [];
					for (n = 0; n < numValues; n++) {
						vals[n] = file.getUint32(valueOffset + 4 * n, !bigEnd)
					}
					return vals
				}
			case 5:
				if (numValues == 1) {
					numerator = file.getUint32(valueOffset, !bigEnd);
					denominator = file.getUint32(valueOffset + 4, !bigEnd);
					val = new Number(numerator / denominator);
					val.numerator = numerator;
					val.denominator = denominator;
					return val
				} else {
					vals = [];
					for (n = 0; n < numValues; n++) {
						numerator = file.getUint32(valueOffset + 8 * n, !bigEnd);
						denominator = file.getUint32(valueOffset + 4 + 8 * n, !bigEnd);
						vals[n] = new Number(numerator / denominator);
						vals[n].numerator = numerator;
						vals[n].denominator = denominator
					}
					return vals
				}
			case 9:
				if (numValues == 1) {
					return file.getInt32(entryOffset + 8, !bigEnd)
				} else {
					vals = [];
					for (n = 0; n < numValues; n++) {
						vals[n] = file.getInt32(valueOffset + 4 * n, !bigEnd)
					}
					return vals
				}
			case 10:
				if (numValues == 1) {
					return file.getInt32(valueOffset, !bigEnd) / file.getInt32(valueOffset + 4, !bigEnd)
				} else {
					vals = [];
					for (n = 0; n < numValues; n++) {
						vals[n] = file.getInt32(valueOffset + 8 * n, !bigEnd) / file.getInt32(valueOffset + 4 + 8 * n, !bigEnd)
					}
					return vals
				}
		}
	}

	function getStringFromDB(buffer, start, length) {
		var outstr = "";
		for (n = start; n < start + length; n++) {
			outstr += String.fromCharCode(buffer.getUint8(n))
		}
		return outstr
	}

	function readEXIFData(file, start) {
		if (getStringFromDB(file, start, 4) != "Exif") {
			if (debug) console.log("Not valid EXIF data! " + getStringFromDB(file, start, 4));
			return false
		}
		var bigEnd, tags, tag, exifData, gpsData, tiffOffset = start + 6;
		if (file.getUint16(tiffOffset) == 0x4949) {
			bigEnd = false
		} else if (file.getUint16(tiffOffset) == 0x4D4D) {
			bigEnd = true
		} else {
			if (debug) console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");
			return false
		}
		if (file.getUint16(tiffOffset + 2, !bigEnd) != 0x002A) {
			if (debug) console.log("Not valid TIFF data! (no 0x002A)");
			return false
		}
		var firstIFDOffset = file.getUint32(tiffOffset + 4, !bigEnd);
		if (firstIFDOffset < 0x00000008) {
			if (debug) console.log("Not valid TIFF data! (First offset less than 8)", file.getUint32(tiffOffset + 4, !bigEnd));
			return false
		}
		tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, TiffTags, bigEnd);
		if (tags.ExifIFDPointer) {
			exifData = readTags(file, tiffOffset, tiffOffset + tags.ExifIFDPointer, ExifTags, bigEnd);
			for (tag in exifData) {
				switch (tag) {
					case "LightSource":
					case "Flash":
					case "MeteringMode":
					case "ExposureProgram":
					case "SensingMethod":
					case "SceneCaptureType":
					case "SceneType":
					case "CustomRendered":
					case "WhiteBalance":
					case "GainControl":
					case "Contrast":
					case "Saturation":
					case "Sharpness":
					case "SubjectDistanceRange":
					case "FileSource":
						exifData[tag] = StringValues[tag][exifData[tag]];
						break;
					case "ExifVersion":
					case "FlashpixVersion":
						exifData[tag] = String.fromCharCode(exifData[tag][0], exifData[tag][1], exifData[tag][2], exifData[tag][3]);
						break;
					case "ComponentsConfiguration":
						exifData[tag] = StringValues.Components[exifData[tag][0]] + StringValues.Components[exifData[tag][1]] + StringValues.Components[exifData[tag][2]] + StringValues.Components[exifData[tag][3]];
						break
				}
				tags[tag] = exifData[tag]
			}
		}
		if (tags.GPSInfoIFDPointer) {
			gpsData = readTags(file, tiffOffset, tiffOffset + tags.GPSInfoIFDPointer, GPSTags, bigEnd);
			for (tag in gpsData) {
				switch (tag) {
					case "GPSVersionID":
						gpsData[tag] = gpsData[tag][0] + "." + gpsData[tag][1] + "." + gpsData[tag][2] + "." + gpsData[tag][3];
						break
				}
				tags[tag] = gpsData[tag]
			}
		}
		return tags
	}
	EXIF.getData = function(img, callback) {
		if ((img instanceof Image || img instanceof HTMLImageElement) && !img.complete) return false;
		if (!imageHasData(img)) {
			getImageData(img, callback)
		} else {
			if (callback) {
				callback.call(img)
			}
		}
		return true
	}
	EXIF.getTag = function(img, tag) {
		if (!imageHasData(img)) return;
		return img.exifdata[tag]
	}
	EXIF.getAllTags = function(img) {
		if (!imageHasData(img)) return {};
		var a, data = img.exifdata,
			tags = {};
		for (a in data) {
			if (data.hasOwnProperty(a)) {
				tags[a] = data[a]
			}
		}
		return tags
	}
	EXIF.pretty = function(img) {
		if (!imageHasData(img)) return "";
		var a, data = img.exifdata,
			strPretty = "";
		for (a in data) {
			if (data.hasOwnProperty(a)) {
				if (typeof data[a] == "object") {
					if (data[a] instanceof Number) {
						strPretty += a + " : " + data[a] + " [" + data[a].numerator + "/" + data[a].denominator + "]\r\n"
					} else {
						strPretty += a + " : [" + data[a].length + " values]\r\n"
					}
				} else {
					strPretty += a + " : " + data[a] + "\r\n"
				}
			}
		}
		return strPretty
	}
	EXIF.readFromBinaryFile = function(file) {
		return findEXIFinJPEG(file)
	}
	if (typeof define === 'function' && define.amd) {
		define('exif-js', [], function() {
			return EXIF
		})
	}
}.call(this));

function cameraDif(canvasId, inputfilename, difcallback, touchtag) {
	var canvas = document.getElementById(canvasId);
	var ctx = canvas.getContext("2d");
	var canTouch = true;
	var canvasStyleWidth = parseInt(canvas.width);
	var scaleFactor = canvas.width / canvasStyleWidth;
	var viewableArea = canvasStyleWidth * scaleFactor;
	var currentSelection;
	var relativeMouse;
	var relativeTouch1;
	var relativeTouch2;
	var pointerOn = false;
	var mouseDown = false;
	var mouseMoving = false;
	var touches = [];
	var fingerSize = 24;
	var touch = {
		touch1PosX: 0,
		touch1PosY: 0,
		touch2PosX: 0,
		touch2PosY: 0,
		initAngle: 0,
		angle: 0,
		angleChange: 0,
		initLength: 0,
		length: 0,
		fingerLength: 0,
		lengthChange: 0
	};
	var image1 = new Image();
	var image2 = new Image();
	image2.src = '';
	image2.onload = function() {
		image2.xPos = canvas.width / 2;
		image2.yPos = canvas.height / 2;
		image2.initWidth = image2.width;
		image2.initHeight = image2.height;
		image2.currentWidth = image2.width;
		image2.currentHeight = image2.height;
		image2.initAngle = 0;
		image2.angle = 0
	};
	var Orientation = null;

	function fileChange(e) {
		var f = e.files[0];
		EXIF.getData(f, function() {
			EXIF.getAllTags(this);
			Orientation = EXIF.getTag(this, 'Orientation');
			if (Orientation == undefined) {
				Orientation = Number(EXIF.getTag(this, 'undefined'))
			}
		});
		difcallback();
		var FR = new FileReader();
		ajaxLoading();
		FR.onload = function(f) {
			var result = this.result;
			compressImg(result, 225)
		};
		FR.readAsDataURL(f)
	}

	function compressImg(imgData, maxWidth) {
		if (!imgData) return;
		image1.onload = function() {
			image1.angle = Math.atan(90);
			image1.xPos = canvas.width / 2;
			image1.yPos = canvas.height / 2;
			image1.initWidth = image1.width;
			image1.initHeight = image1.height;
			image1.currentWidth = scale(image1.initHeight, viewableArea, image1.initWidth);
			image1.currentHeight = viewableArea;
			if (image1.currentWidth < viewableArea) {
				image1.currentWidth = viewableArea;
				image1.currentHeight = scale(image1.initWidth, viewableArea, image1.initHeight)
			}
			if (Orientation != "" && Orientation != 1) {
				switch (Orientation) {
					case 6:
						image1.initAngle = 0;
						image1.angle = Math.atan(90);
						break;
					case 5:
						image1.initAngle = 0;
						image1.angle = Math.atan(0);
						break;
					case 8:
						image1.initAngle = 0;
						image1.angle = Math.atan(-90);
						break;
					case 3:
						image1.initAngle = 0;
						image1.angle = Math.atan(180);
						break;
					default:
						image1.initAngle = 0;
						image1.angle = Math.atan(0);
						break
				}
			} else {
				image1.initAngle = 0;
				image1.angle = Math.atan(0)
			}
			update(image1);
			ajaxLoadingRemove()
		};
		image1.src = imgData
	}

	function getCurrentSelection(position) {
		if (position.clientX > image2.xPos && position.clientX < image2.xPos + image2.initWidth && position.clientY > image2.yPos && position.clientY - 185 < image2.yPos + image2.initHeight) {
			return image2
		}
		return image1
	}
	document.getElementById(inputfilename).addEventListener("change", function(event) {
		fileChange(this)
	});
	var touchObject = canvas;
	if (touchtag != '') {
		touchObject = touchtag
	}
	touchObject.addEventListener("touchstart", function(event) {
		pointerStart(event)
	});
	touchObject.addEventListener("touchmove", function(event) {
		pointerMove(event)
	});
	touchObject.addEventListener("touchend", function(event) {
		pointerEnd(event)
	});
	touchObject.addEventListener("touchcancel", function(event) {
		pointerEnd(event)
	});

	function scale(oldSize, newSize, other) {
		var scaleFactor = newSize / oldSize;
		return other * scaleFactor
	}

	function pointerStart(event) {
		if (!canTouch) return;
		currentSelection = getCurrentSelection(event.touches[0]);
		var relativeTouch1;
		var relativeTouch2;
		if (event.touches !== undefined && event.touches.length === 1) {
			relativeTouch1 = getRelative(event.touches[0]);
			touch.touch1PosX = relativeTouch1.x;
			touch.touch1PosY = relativeTouch1.y;
			touch.offsetX = touch.touch1PosX - currentSelection.xPos;
			touch.offsetY = touch.touch1PosY - currentSelection.yPos
		} else if (event.touches !== undefined && event.touches.length > 1) {
			currentSelection.initAngle = currentSelection.angle;
			currentSelection.initWidth = currentSelection.currentWidth;
			currentSelection.initHeight = currentSelection.currentHeight;
			relativeTouch1 = getRelative(event.touches[0]);
			relativeTouch2 = getRelative(event.touches[1]);
			touch.touch1PosX = relativeTouch1.x;
			touch.touch1PosY = relativeTouch1.y;
			touch.touch2PosX = relativeTouch2.x;
			touch.touch2PosY = relativeTouch2.y;
			var mid = findMidPoint(relativeTouch1, relativeTouch2);
			touch.offsetX = mid.x - currentSelection.xPos;
			touch.offsetY = mid.y - currentSelection.yPos;
			touch.initAngle = slopeAngle(relativeTouch1, relativeTouch2);
			touch.angle = slopeAngle(relativeTouch1, relativeTouch2);
			touch.angleChange = 0;
			touch.initLength = findLength(relativeTouch1, relativeTouch2);
			touch.lengthChange = 0
		}
	}

	function pointerMove(event) {
		if (!canTouch) return;
		var relativeTouch1;
		var relativeTouch2;
		event.preventDefault();
		touches = event.touches;
		if (event.touches !== undefined && event.touches.length === 1) {
			relativeTouch1 = getRelative(event.touches[0]);
			touch.touch1PosX = relativeTouch1.x;
			touch.touch1PosY = relativeTouch1.y;
			relativeTouch1 = {
				x: touch.touch1PosX - touch.offsetX,
				y: touch.touch1PosY - touch.offsetY
			};
			moveImage(currentSelection, relativeTouch1)
		}
		if (event.touches !== undefined && event.touches.length > 1) {
			relativeTouch1 = getRelative(event.touches[0]);
			relativeTouch2 = getRelative(event.touches[1]);
			touch.touch1PosX = relativeTouch1.x;
			touch.touch1PosY = relativeTouch1.y;
			touch.touch2PosX = relativeTouch2.x;
			touch.touch2PosY = relativeTouch2.y;
			touch.angle = slopeAngle(relativeTouch1, relativeTouch2);
			touch.angleChange = touch.angle - touch.initAngle;
			touch.length = findLength(relativeTouch1, relativeTouch2);
			touch.lengthChange = touch.length - touch.initLength;
			relativeTouch1 = {
				x: touch.touch1PosX,
				y: touch.touch1PosY
			};
			relativeTouch2 = {
				x: touch.touch2PosX,
				y: touch.touch2PosY
			};
			var mid = findMidPoint(relativeTouch1, relativeTouch2);
			twoFingerRotate(currentSelection, mid);
			twoFingerResize(currentSelection, mid);
			mid.x -= touch.offsetX;
			mid.y -= touch.offsetY;
			moveImage(currentSelection, mid)
		}
		if (mouseDown) {
			relativeMouse = {
				x: touch.touch1PosX - touch.offsetX,
				y: touch.touch1PosY - touch.offsetY
			};
			moveImage(currentSelection, relativeMouse)
		}
		update(currentSelection)
	}

	function pointerEnd(event) {
		if (!canTouch) return;
		currentSelection.initAngle = currentSelection.angle;
		currentSelection.initWidth = currentSelection.currentWidth;
		currentSelection.initHeight = currentSelection.currentHeight;
		touch.angle = 0;
		touch.angleChange = 0;
		touch.length = 0;
		touch.lengthChange = 0;
		if (event !== undefined) {
			if (event.touches !== undefined && event.touches.length == 1) {
				relativeTouch1 = getRelative(event.touches[0]);
				touch.touch1PosX = relativeTouch1.x;
				touch.touch1PosY = relativeTouch1.y;
				touch.offsetX = touch.touch1PosX - currentSelection.xPos;
				touch.offsetY = touch.touch1PosY - currentSelection.yPos
			}
		}
	}

	function moveImage(image, location) {
		if (isInsideImage(image, location)) {
			image.xPos = location.x;
			image.yPos = location.y
		}
	}

	function getRelative(position) {
		return {
			x: makeRelative(position).x,
			y: makeRelative(position).y
		}
	}

	function makeRelative(object) {
		var relativeCoords;
		if (typeof object.clientX !== "undefined") {
			relativeCoords = {
				x: (object.clientX - canvas.getBoundingClientRect().left) * scaleFactor,
				y: (object.clientY - canvas.getBoundingClientRect().top) * scaleFactor
			}
		} else {
			relativeCoords = {
				x: (object.x - canvas.getBoundingClientRect().left) * scaleFactor,
				y: (object.y - canvas.getBoundingClientRect().top) * scaleFactor
			}
		}
		return relativeCoords
	}

	function isInsideImage(image, pointer) {
		return isInside(image.xPos - image.currentWidth / 2, image.yPos - image.currentHeight / 2, image.currentWidth, image.currentHeight, pointer.x, pointer.y)
	}

	function isInside(x1, y1, width1, height1, x2, y2) {
		return x2 >= x1 && x2 < x1 + width1 && y2 >= y1 && y2 < y1 + height1
	}

	function drawRotatedImage(image) {
		ctx.save();
		ctx.translate(image.xPos, image.yPos);
		ctx.rotate(image.angle);
		ctx.translate(-image.xPos, -image.yPos);
		ctx.drawImage(image, 0, 0, image.width, image.height, image.xPos - (image.currentWidth / 2), image.yPos - (image.currentHeight / 2), image.currentWidth, image.currentHeight);
		ctx.restore()
	}

	function findLength(start, end) {
		var a = end.x - start.x;
		var b = end.y - start.y;
		var csq = (a * a) + (b * b);
		return Math.floor(Math.sqrt(csq))
	}

	function findMidPoint(start, end) {
		return {
			x: (start.x + end.x) / 2,
			y: (start.y + end.y) / 2
		}
	}

	function slopeAngle(start, end) {
		var run = end.x - start.x;
		var rise = end.y - start.y;
		return Math.atan2(run, rise)
	}

	function resizeImage(image, newWidth) {
		var origHeight = image.currentHeight;
		var origWidth = image.currentWidth;
		if (newWidth < 50) {
			newWidth = 50
		} else {
			newWidth = newWidth
		}
		image.currentWidth = newWidth;
		image.currentHeight = (origHeight / origWidth) * newWidth
	}

	function twoFingerResize(image, location) {
		if (isInsideImage(image, location)) {
			touch.lengthChange = touch.length - touch.initLength;
			resizeImage(image, image.initWidth + touch.lengthChange)
		}
	}

	function twoFingerRotate(image, location) {
		if (isInsideImage(image, location)) {
			image.angle = image.initAngle - touch.angleChange
		}
	}

	function update(image) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawRotatedImage(image)
	}

	function clear() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
	}
	var brighterMatrix = [1, 0, 0, 0, 30, 0, 1, 0, 0, 30, 0, 0, 1, 0, 30, 0, 0, 0, 1, 0, ];
	var darkerMatrix = [1, 0, 0, 0, -30, 0, 1, 0, 0, -30, 0, 0, 1, 0, -30, 0, 0, 0, 1, 0, ];
	var identityMatrix = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, ];

	function loadColorMatrix(matrix) {
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		ctx.putImageData(colorMatrixFilter(imageData, matrix), 0, 0)
	}

	function colorMatrixFilter(pixels, m) {
		var d = pixels.data;
		for (var i = 0; i < d.length; i += 4) {
			var r = d[i];
			var g = d[i + 1];
			var b = d[i + 2];
			var a = d[i + 3];
			d[i] = r * m[0] + g * m[1] + b * m[2] + a * m[3] + m[4];
			d[i + 1] = r * m[5] + g * m[6] + b * m[7] + a * m[8] + m[9];
			d[i + 2] = r * m[10] + g * m[11] + b * m[12] + a * m[13] + m[14];
			d[i + 3] = r * m[15] + g * m[16] + b * m[17] + a * m[18] + m[19]
		}
		return pixels
	}
}

function convertCanvasToImage(canvas) {
	var str = document.getElementById(canvas).toDataURL("image/png");
	return str
}

function convertCanvasToImage2(canvas, callback) {
	var image = new Image();
	image.src = document.getElementById(canvas).toDataURL("image/jpeg", 1);
	image.onload = function() {
		callback(image)
	}
}

function ajaxLoading() {
	var str = "<div id='ajaxLoading' style='width:100%;height:100%;position:fixed;top:0;left:0;z-index:99999;'>";
	str += "<div class='ajaxLoadingBg' style='width:100%;height:100%;position:absolute;top:0;left:0;z-index:9;background:#000;opacity:0.75;'></div>";
	str += "<div class='ajaxLoadingBd' style='width:100%;height:24px;font-size:24px;position:absolute;top:50%;margin-top:-12px;left:0;z-index:10;color:#fff;line-height:24px;text-align:center;'>loading...</div>";
	str += "</div>";
	$("body").append(str)
}

function ajaxLoadingRemove() {
	$("#ajaxLoading").remove()
}