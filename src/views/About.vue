<template>
  <div class="about">
    <h2 class="text-center">This is a demonstration tool of 88musaics.org</h2>
    <!-- <div class="alert alert-success alert-dismissible fade show" role="alert">
      TODO ...
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">
          <font-awesome-icon icon="yin-yang" size="lg" />
        </span>
      </button>
    </div> -->
    
    <div class="card" style="width: 100%">
    <img
            src="analyse/setAnalyse.png"
            title="analyse set"
            alt="modulate"
            class="img-fluid m-1"
            width="790"
            height="424"
        >
      <div class="card-body">
        <p class="card-text">Powerset himself can be partitioned by</p>
         <ul>
           <li>Relationship on orbits (same IF-Motif)</li>
           <li>Relationship on fixed pcs (same stabilizers)</li>
         </ul>
      </div>
    </div>
    <h3>Two cases : IS-Motif and Stabilizers classifiers</h3>

    <div class="card" style="width: 100%">
    <img
            src="analyse/orbitsByISMotif.png"
            title="analyse set"
            alt="modulate"
            class="img-fluid m-1"
            width="514"
            height="423"
        >
    <div class="d-flex">
        <p class="card-text">
          A IS-Motif may stabilizer one or many orbits. Example of IS-MOTIF : [M1 M5 CM7 CM11]
        </p>

      </div>
    </div>

    <div class="card m-2" style="width: 100%">
    <img
            src="analyse/orbitsByStabilizers.png"
            title="analyse by stabilizers"
            alt="modulate"
            class="img-fluid m-1"
            width="547"
            height="421"
        >
    <div class="d-flex">
      <ul>
        <li><p class="card-text">Orbit of Powerset is partitioned by one or many Stabilizers</p></li>
        <li><p class="card-text">A same Stabilizer may partition sub-set of many orbits</p></li>
      </ul>

      </div>
    </div>
  </div>
</template>
<script>

</script>
<style scoped>
.card-text {
  color : black
}
</style>
