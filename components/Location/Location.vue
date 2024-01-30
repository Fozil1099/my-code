<script lang="ts" setup>
import { useGeolocation } from "@vueuse/core";
import { ref, reactive, onMounted } from "vue";

interface Props {
  modelValue?: {
    lat?: number;
    lng?: number;
  } | null;
  circle?: boolean;
  getLocation?: boolean;
}

interface Markers {
  position: {
    lat: number;
    lng: number;
  };
}

interface Emits {
  (
    event: "update:modelValue",
    value: {
      lat: number;
      lng: number;
    }
  ): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const markers = reactive<Markers>({
  position: {
    lat: 0,
    lng: 0,
  },
});

let circle = reactive({
  id: "duesseldorf",
  population: 1000,
  position: {
    lat: 41.320599,
    lng: 69.24695,
  },
});

let center = ref({ lat: 41.320599, lng: 69.24695 });

const mark = (e) => {
  markers.position.lat = e.latLng.lat();
  markers.position.lng = e.latLng.lng();

  emit("update:modelValue", markers.position);
};

const refresh = () => {
  if (props.modelValue && props.modelValue?.lat && props.modelValue.lng) {
    markers.position = {
      lat: props.modelValue.lat,
      lng: props.modelValue.lng,
    };
    circle.position = {
      lat: props.modelValue.lat,
      lng: props.modelValue.lng,
    };
    center.value.lat = props.modelValue.lat;
    center.value.lng = props.modelValue.lng;
  } else if (props.getLocation) {
    const { coords } = useGeolocation();
    markers.position = {
      lat: coords.value.latitude,
      lng: coords.value.longitude,
    };
    circle.position = {
      lat: coords.value.latitude,
      lng: coords.value.longitude,
    };

    center.value.lat = coords.value.latitude;
    center.value.lng = coords.value.longitude;
    emit("update:modelValue", markers.position);
  }
};

onMounted(() => {
  setTimeout(() => {
    refresh();
  }, 400);
});

defineExpose({ refresh });
</script>

<template>
  <GMapMap
    :center="center"
    :zoom="10"
    map-type-id="terrain"
    class="h-full w-full rounded-lg overflow-hidden"
    :options="{
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: true,
      rotateControl: true,
      fullscreenControl: true,
    }"
    @click="mark"
  >
    <GMapCircle
      v-if="props.circle"
      :options="{
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
      }"
      :radius="Math.sqrt(circle.population) * 100"
      :center="{ lat: circle.position.lat, lng: circle.position.lng }"
      @click="mark"
    />
    <GMapMarker
      :position="markers.position"
      :clickable="true"
      :draggable="true"
      @click="center = markers.position"
      @drag="mark"
    />
  </GMapMap>
</template>
