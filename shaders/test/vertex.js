const vertex = /* glsl */ `
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aRandom;
attribute float aColor;
varying float vColor;
void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // modelPosition.x *= aRandom * 2.0;
    modelPosition.y -= aRandom * 0.01;
    // modelPosition.z *= aRandom * 2.0;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    vColor = aColor;
}`;
export default vertex;
