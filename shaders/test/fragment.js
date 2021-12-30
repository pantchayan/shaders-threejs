const fragment = /* glsl */ `
precision mediump float;

varying float vColor;
void main()
{
    gl_FragColor = vec4(1.0, vColor, 0.0, 1.0);
}
`;

export default fragment;
