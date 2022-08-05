package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import mefpai.gouv.sn.domain.Attribution;
import mefpai.gouv.sn.repository.AttributionRepository;
import mefpai.gouv.sn.service.AttributionService;
import mefpai.gouv.sn.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link mefpai.gouv.sn.domain.Attribution}.
 */
@RestController
@RequestMapping("/api")
public class AttributionResource {

    private final Logger log = LoggerFactory.getLogger(AttributionResource.class);

    private static final String ENTITY_NAME = "attribution";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AttributionService attributionService;

    private final AttributionRepository attributionRepository;

    public AttributionResource(AttributionService attributionService, AttributionRepository attributionRepository) {
        this.attributionService = attributionService;
        this.attributionRepository = attributionRepository;
    }

    /**
     * {@code POST  /attributions} : Create a new attribution.
     *
     * @param attribution the attribution to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new attribution, or with status {@code 400 (Bad Request)} if the attribution has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/attributions")
    public ResponseEntity<Attribution> createAttribution(@Valid @RequestBody Attribution attribution) throws URISyntaxException {
        log.debug("REST request to save Attribution : {}", attribution);
        if (attribution.getId() != null) {
            throw new BadRequestAlertException("A new attribution cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Attribution result = attributionService.save(attribution);
        return ResponseEntity
            .created(new URI("/api/attributions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /attributions/:id} : Updates an existing attribution.
     *
     * @param id the id of the attribution to save.
     * @param attribution the attribution to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated attribution,
     * or with status {@code 400 (Bad Request)} if the attribution is not valid,
     * or with status {@code 500 (Internal Server Error)} if the attribution couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/attributions/{id}")
    public ResponseEntity<Attribution> updateAttribution(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Attribution attribution
    ) throws URISyntaxException {
        log.debug("REST request to update Attribution : {}, {}", id, attribution);
        if (attribution.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, attribution.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!attributionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Attribution result = attributionService.save(attribution);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, attribution.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /attributions/:id} : Partial updates given fields of an existing attribution, field will ignore if it is null
     *
     * @param id the id of the attribution to save.
     * @param attribution the attribution to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated attribution,
     * or with status {@code 400 (Bad Request)} if the attribution is not valid,
     * or with status {@code 404 (Not Found)} if the attribution is not found,
     * or with status {@code 500 (Internal Server Error)} if the attribution couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/attributions/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Attribution> partialUpdateAttribution(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Attribution attribution
    ) throws URISyntaxException {
        log.debug("REST request to partial update Attribution partially : {}, {}", id, attribution);
        if (attribution.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, attribution.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!attributionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Attribution> result = attributionService.partialUpdate(attribution);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, attribution.getId().toString())
        );
    }

    /**
     * {@code GET  /attributions} : get all the attributions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of attributions in body.
     */
    @GetMapping("/attributions")
    public ResponseEntity<List<Attribution>> getAllAttributions(Pageable pageable) {
        log.debug("REST request to get a page of Attributions");
        Page<Attribution> page = attributionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /attributions/:id} : get the "id" attribution.
     *
     * @param id the id of the attribution to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the attribution, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/attributions/{id}")
    public ResponseEntity<Attribution> getAttribution(@PathVariable Long id) {
        log.debug("REST request to get Attribution : {}", id);
        Optional<Attribution> attribution = attributionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(attribution);
    }

    /**
     * {@code DELETE  /attributions/:id} : delete the "id" attribution.
     *
     * @param id the id of the attribution to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/attributions/{id}")
    public ResponseEntity<Void> deleteAttribution(@PathVariable Long id) {
        log.debug("REST request to delete Attribution : {}", id);
        attributionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
