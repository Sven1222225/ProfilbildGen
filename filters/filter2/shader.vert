precision highp float;

attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform float uRotation;

varying vec2 vTexCoord;


void main() {
    mat2 rotationMatrix = mat2(cos(uRotation), -sin(uRotation), sin(uRotation), cos(uRotation));

    vec2 rotatedPos = rotationMatrix * aPosition.xy;
    vec3 finalPos = vec3(rotatedPos, aPosition.z);

    vec4 viewModelPosition = uModelViewMatrix * vec4(finalPos, 1.0);

    gl_Position = uProjectionMatrix * viewModelPosition;

    vTexCoord = aTexCoord;
}