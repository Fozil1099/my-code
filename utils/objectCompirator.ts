export class ReactiveObjectComparator {
  private value: Record<symbol, any>;
  private constant: Record<symbol, any>;

  constructor(value: Record<string, any>) {
    this.value = this.createReactiveProxy(value);
    this.constant = value;
  }

  private createReactiveProxy(obj: Record<symbol, any>): Record<string, any> {
    return new Proxy(obj, {
      set: (target, property, value) => {
        target[property] = value;
        return true;
      },
    });
  }

  public getDifference() {
    return this.findDifferencesRecursive(this.value, this.constant);
  }

  private findDifferencesRecursive(
    obj1: Record<string, any>,
    obj2: Record<string, any>
  ): Record<string, any> {
    const differences: Record<string, any> = {};

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const allKeys = new Set([...keys1, ...keys2]);

    for (const key of allKeys) {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (typeof value1 === "object" && typeof value2 === "object") {
        const nestedDifferences = this.findDifferencesRecursive(value1, value2);

        if (Object.keys(nestedDifferences).length > 0) {
          differences[key] = nestedDifferences;
        }
      } else if (value1 !== value2) {
        differences[key] = value1;
      }
    }

    return differences;
  }
}

// Пример использования
const obj1 = { a: 1, b: { c: 2, d: 3 }, e: [4, 5] };

const comparator1 = new ReactiveObjectComparator(obj1);

// Меняем значения и увидим, как будут отслеживаться изменения
// comparator.reactiveObj1.a = 42;
// comparator.reactiveObj2.b.c = 99;  