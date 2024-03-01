class Path extends GameObject{
  constructor(){
    super(new Vector3(1200/2-958/2,1600/2-1373/2,0),new Size(958,1373));
    this.setTexture(getTex('path'));
  }
}

class pNode{
  constructor(id,x,y){
    this.id = id;
    this.x = x;
    this.y = y;
  }

  get prew(){
    const id = this.id - 1;
    return id >= 0 ? id : nodes.length - 1;
  }

  get next(){
    const id = this.id + 1;
    return id >= nodes.length ? 0 : id;
  }
}

var nodes = [
  new pNode(0,1045,143),
  new pNode(1,1045,1459),
  new pNode(2,120,1459),
  new pNode(3,120,143)
]

nodes.getByAngle = function(angle) {
  // Приводим угол к положительному значению
  angle = (angle + 360) % 360;

  // Вычисляем индексы узлов, между которыми находится данный угол
  const index1 = Math.floor(angle / 90);
  const index2 = (index1 + 1) % nodes.length;

  // Интерполируем позицию между двумя узлами на основе заданного угла
  const node1 = nodes[index1];
  const node2 = nodes[index2];
  const ratio = (angle % 90) / 90;
  const x = node1.x + (node2.x - node1.x) * ratio;
  const y = node1.y + (node2.y - node1.y) * ratio;

  return {
    pos: new Vector3(x,y,1),
    prew: node1,
    next: node2
  };
};
