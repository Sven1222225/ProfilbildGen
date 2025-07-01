precision highp float;

uniform vec4 uColor;
uniform sampler2D uTexture;

varying vec2 vTexCoord;


vec4 toGray(vec4 color) {
    float grayValue = (color.r + color.g + color.b) / 3.0;
    color.rgb = vec3(grayValue);
    return color;
}

vec4 filterForShape(vec4 color) {
    float grayValue = toGray(color).r;

    //to have a nice shape, reduces fuzzy edges.
    if(grayValue > 0.89){
        color.rgba = vec4(1);
    }else{
        color.rgba = vec4(0);
    }

    return color;
}

void main() {
    vec4 shape = texture2D(uTexture, vTexCoord);
    shape = filterForShape(shape);

    gl_FragColor = shape * uColor;
}
