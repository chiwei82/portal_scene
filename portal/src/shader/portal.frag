// inspired by https://www.shadertoy.com/view/tfG3zt

precision highp float;
varying vec2 vUv;
uniform vec3 uColor;
uniform float uTime;

mat2 rot(float x) {
  return mat2(cos(x), -sin(x), sin(x), cos(x));
}

vec3 pal(float x) {
  return 0.5 + 0.5 * cos(6.2831 * x - vec3(5.0, 0.0, 2.0));
}

void main() {
  vec2 uv = vUv - 0.5;
  float tt = uTime * 0.1;

  uv *= mix(0.8, 1.2, sin(-tt + 5.0 * length(uv)));

  vec3 col = vec3(0.0);
  vec3 rd = vec3(uv, 1.0);
  float t = 0.0;

  for (float i = 0.0; i < 80.0; i++) {
    vec3 p = t * rd + rd;
    p.z += tt;
    float z = p.z;
    p.xy *= rot(p.z);

    for (float j = 0.0; j < 3.0; j++) {
      float a = exp(j) / exp2(j);
      p += cos(3.0 * p.yzx * a + 0.5 * tt - length(p.xy) * 9.0) / a;
    }

    float d = 0.007 + abs((exp2(1.3 * p) - vec3(0.0, 1.0 + 0.7 * sin(tt), 0.0)).y - 1.0) / 14.0;
    float k = t * 0.7 + length(p) * 0.1 - 0.2 * tt + z * 0.1;

    vec3 c = pal(7.0 * k);
    c = mix(c, c * vec3(0.922, 0.973, 0.725), sin(z * 0.5));
    col += c * 0.001 / d;
    t += d / 4.0;
  }

  float gl = exp(-20.0 * length(uv));
  col += 0.4 * mix(vec3(0.361, 0.957, 1.000), vec3(0.847, 1.000, 0.561), sin(gl * 2.0 - tt)) * pow(gl * 11.0, 1.0);

  col *= tanh(col * 0.1);
  col = pow(col, vec3(0.45));
  col *= uColor;
  gl_FragColor = vec4(col, 1.0);
}
