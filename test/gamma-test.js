var tape = require("tape-await"),
    skewness = require("./skewness"),
    kurtosis = require("./kurtosis"),
    d3 = Object.assign({}, require("../"), require("d3-array"));

require("./inDelta");

tape("randomGamma(k) returns random numbers with a mean of k", test => {
  var randomGamma = d3.randomGamma.source(d3.randomLcg(0.8177609532536807));
  test.inDelta(d3.mean(d3.range(10000).map(randomGamma(0.1))), 0.1, 0.01);
  test.inDelta(d3.mean(d3.range(10000).map(randomGamma(0.5))), 0.5, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomGamma(1))), 1, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomGamma(2))), 2, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomGamma(10))), 10, 0.05);
});

tape("randomGamma(k) returns random numbers with a variance of k", test => {
  var randomGamma = d3.randomGamma.source(d3.randomLcg(0.6494198931625885));
  test.inDelta(d3.variance(d3.range(10000).map(randomGamma(0.1))), 0.1, 0.005);
  test.inDelta(d3.variance(d3.range(10000).map(randomGamma(0.5))), 0.5, 0.05);
  test.inDelta(d3.variance(d3.range(10000).map(randomGamma(1))), 1, 0.05);
  test.inDelta(d3.variance(d3.range(10000).map(randomGamma(2))), 2, 0.1);
  test.inDelta(d3.variance(d3.range(10000).map(randomGamma(10))), 10, 0.5);
});

tape("randomGamma(k) returns random numbers with a skewness of 2 / sqrt(k)", test => {
  var randomGamma = d3.randomGamma.source(d3.randomLcg(0.02223371708142996));
  test.inDelta(skewness(d3.range(10000).map(randomGamma(0.1))), Math.sqrt(40), 1);
  test.inDelta(skewness(d3.range(10000).map(randomGamma(0.5))), Math.sqrt(8), 0.25);
  test.inDelta(skewness(d3.range(10000).map(randomGamma(1))), 2, 0.1);
  test.inDelta(skewness(d3.range(10000).map(randomGamma(2))), Math.sqrt(2), 0.1);
  test.inDelta(skewness(d3.range(10000).map(randomGamma(10))), Math.sqrt(0.4), 0.05);
});

tape("randomGamma(k) returns random numbers with an excess kurtosis of 6 / k", test => {
  var randomGamma = d3.randomGamma.source(d3.randomLcg(0.19568718910927974));
  test.inDelta(kurtosis(d3.range(10000).map(randomGamma(0.1))), 60, 15);
  test.inDelta(kurtosis(d3.range(10000).map(randomGamma(0.5))), 12, 3);
  test.inDelta(kurtosis(d3.range(10000).map(randomGamma(1))), 6, 1.5);
  test.inDelta(kurtosis(d3.range(10000).map(randomGamma(2))), 3, 1);
  test.inDelta(kurtosis(d3.range(10000).map(randomGamma(10))), 0.6, 0.2);
});

tape("randomGamma(k, theta) returns random numbers with a mean of k * theta and a variance of k * theta^2", test => {
  var randomGamma = d3.randomGamma.source(d3.randomLcg(0.9608725416165995));
  test.inDelta(d3.mean(d3.range(10000).map(randomGamma(1, 2))), 2, 0.05);
  test.inDelta(d3.mean(d3.range(10000).map(randomGamma(2, 4))), 8, 0.2);
  test.inDelta(d3.deviation(d3.range(10000).map(randomGamma(1, 2))), 2, 0.1);
  test.inDelta(d3.deviation(d3.range(10000).map(randomGamma(2, 4))), Math.sqrt(2) * 4, 0.1);
});
